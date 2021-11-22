"""get a personalized meal plan given certain parameters: """
import os
from dotenv import find_dotenv, load_dotenv
import requests
from edamam import get_recipe_info


load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")


def meal_plan(plan_type="weekly", callower=2000, calupper=5000, diet=None, health=None):
    """function meal_plan: get recipe info based on parameters"""
    avglow = round(callower / 3)
    avghigh = round(calupper / 3)
    if plan_type == "weekly":
        length = 7
    else:
        length = 1

    url = (
        "https://api.edamam.com/search?q="
        + "&app_id="
        + EDAMAM_API_ID
        + "&app_key="
        + EDAMAM_API_KEY
        + "&from=0&to="
        + str(length)
        + "&calories="
        + str(avglow)
        + "-"
        + str(avghigh)
    )
    if diet is not None:
        url += "&diet=" + diet
    if health is not None:
        url += "&health=" + health

    def meal_type(m_t):
        """function meal_type: get recipe info based on parameters"""
        params = {
            "mealType": m_t,
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
                recipe["label"] for recipe in recipes if recipe is not None
            ]  # filter out None values
        else:
            return False
        return recipes

    breakfast = meal_type("Breakfast")
    lunch = meal_type("Lunch")
    dinner = meal_type("Dinner")

    return {
        "url": url,
        "breakfast": breakfast,
        "lunch": lunch,
        "dinner": dinner,
    }


print(
    meal_plan(
        plan_type="daily", callower=1000, calupper=3000, diet="balanced", health="vegan"
    )
)
