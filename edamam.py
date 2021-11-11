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
        cookingtime = "N/A" if recipe["totalTime"] == 0.0 else recipe["totalTime"]
        calories = "N/A" if recipe["calories"] == 0.0 else round(recipe["calories"])
        ingredients = (
            "N/A" if recipe["ingredients"] == [] else recipe["ingredientLines"]
        )
        dietlabels = ["N/A"] if recipe["dietLabels"] == [] else recipe["dietLabels"]
        healthlabels = (
            ["N/A"] if recipe["healthLabels"] == [] else recipe["healthLabels"]
        )
        cautions = ["N/A"] if recipe["cautions"] == [] else recipe["cautions"]

        recipe_info = {
            "label": recipe["label"],
            "image": recipe["image"],
            "url": recipe["url"],
            "calories": calories,
            "cookingtime": cookingtime,
            "ingredients": ingredients,
            "dietLabels": dietlabels,
            "healthLabels": healthlabels,
            "cautions": cautions,
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
