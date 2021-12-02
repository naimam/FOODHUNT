# pylint: disable=E1101, C0413, W1508, R0903, W0603, R0913, R0914
"""get a personalized meal plan given certain parameters: """
import os
import random
from dotenv import find_dotenv, load_dotenv
import requests
from edamam import get_recipe_info


load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")


def meal_plan(meals, plan_type, callower=1800, calupper=2500, diet=None, health=None):
    """function meal_plan: get recipe info based on parameters"""
    avglow = round(callower / len(meals))
    avghigh = round(calupper / len(meals))

    length = plan_type

    url = (
        "https://api.edamam.com/search?q="
        + "&app_id="
        + EDAMAM_API_ID
        + "&app_key="
        + EDAMAM_API_KEY
        + "&calories="
        + str(avglow)
        + "-"
        + str(avghigh)
    )
    if diet is not None:
        url += "&diet=" + diet
    if len(health) > 0:
        for i in health:
            url += "&health=" + i

    all_meals = {}

    for query in meals:
        params = {"mealType": query, "q": query, "random": True}
        response = requests.get(url, params=params)
        data = response.json()
        try:
            results = data["hits"]
        except KeyError:
            results = []
        if not results:
            # no recipes found <- TODO: handle error
            return False
        recipes = [
            get_recipe_info(recipe["recipe"])
            for recipe in results
            if recipe is not None
        ]

        meal_list = []
        random.shuffle(recipes)
        for i in range(length):
            # append meal to random index of recipes
            meal_list.append(recipes[i])
        all_meals[query] = meal_list
    return all_meals
