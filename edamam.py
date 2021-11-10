"""edamam.py: returns list information on recipes given a keyword. using Edamam API. """
import os
import json
from dotenv import find_dotenv, load_dotenv
import requests

load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")


def get_recipe_info(recipe):
    """returns a dictionary of recipe information."""
    try:
        if recipe["totalTime"] == 0.0:
            cookingtime = "N/A"
        else:
            cookingtime = round(recipe["totalTime"])
        recipe_info = {
            "label": recipe["label"],
            "image": recipe["image"],
            "url": recipe["url"],
            "calories": round(recipe["calories"]),
            "cookingtime": cookingtime,
            "ingredients": recipe["ingredientLines"],
            "dietLabels": recipe["dietLabels"],
            "healthLabels": recipe["healthLabels"],
            "cautions": recipe["cautions"],
        }
    except KeyError:
        recipe_info = None
    return recipe_info


def recipe_search(keyword):
    """returns a list of recipes given a keyword."""
    url = "https://api.edamam.com/search"
    params = {
        "q": keyword,
        "from": "0",
        "to": "10",
        "app_id": EDAMAM_API_ID,
        "app_key": EDAMAM_API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    try:
        results = data["hits"]
    except KeyError:
        return False

    if results:
        recipes = [get_recipe_info(recipe["recipe"]) for recipe in results]
        recipes = [
            recipe for recipe in recipes if recipe is not None
        ]  # filter out None values
    else:
        return False

    recipes_info = json.dumps(recipes)
    return recipes_info


print(recipe_search("chicken"))
