"""get a personalized meal plan given certain parameters: """
import os
from dotenv import find_dotenv, load_dotenv
import requests
import random
from edamam import get_recipe_info, recipe_from_id


load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")


def meal_plan(plan_type, callower=1800, calupper=2500, diet=None, health=[]):
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
            results = []
        if results:
            recipes = [
                get_recipe_info(recipe["recipe"])
                for recipe in results
                if recipe is not None
            ]
            recipes = [
                recipe["recipe_id"] for recipe in recipes if recipe is not None
            ]  # filter out None values

            meals = []
            for i in range(length):
                # append meal to random index of recipes
                meals.append(random.choice(recipes))

            return meals

        return (
            False  # no recipes found <- TODO: handle this case by including dummy data
        )

    breakfast = meal_type("Breakfast")
    lunch = meal_type("Lunch")
    dinner = meal_type("Dinner")

    return (breakfast, lunch, dinner)


# TEST
# breakfast, lunch, dinner = meal_plan(
#     plan_type="daily", diet="balanced", health=["vegan", "alcohol-free"]
# )
# print(breakfast)
# print(lunch)
# print(dinner)

# if breakfast is not False:
#     for i in range(len(breakfast)):
#         print(recipe_from_id(breakfast[i]))
