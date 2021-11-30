"""get a personalized meal plan given certain parameters: """
import os
from dotenv import find_dotenv, load_dotenv
import requests
import random
from edamam import get_recipe_info


load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")


def meal_plan(meals, plan_type, callower=1800, calupper=2500, diet=None, health=[]):
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

    for q in meals:
        params = {"mealType": q, "q": q, "random": True}
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

        # recipesId = [
        #     recipe["recipe_id"] for recipe in recipes if recipe is not None
        # ]  # filter out None values

        mealList = []
        random.shuffle(recipes)
        for i in range(length):
            # append meal to random index of recipes
            mealList.append(recipes[i])
        all_meals[q] = mealList
    return all_meals
