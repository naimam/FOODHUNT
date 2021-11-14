"""edamam.py: returns list information on recipes given a keyword. using Edamam API. """
import os
import json
from dotenv import find_dotenv, load_dotenv
import requests

load_dotenv(find_dotenv())

EDAMAM_API_ID = os.getenv("EDAMAM_API_ID")
EDAMAM_API_KEY = os.getenv("EDAMAM_API_KEY")

RECOMMENDED_RECIPES = [
    {
        "recipe_id": "1db961989c3b89b1cd7689b13daf9829",
        "label": "Japanese 7-Eleven Egg Salad Sandwich",
        "image": "https://www.edamam.com/web-img/051/051d474a9eb46f52f328c6b00b400e5c.jpg",
        "url": "https://food52.com/recipes/73219-japanese-7-eleven-egg-salad-sandwich",
        "calories": 580,
        "cookingtime": 20.0,
        "ingredients": [
            "2 slices soft white bread (shokupan is best)",
            "2 hard-boiled eggs",
            "3 tablespoons kewpie mayonnaise",
            "salt and pepper, to taste",
        ],
        "dietLabels": ["N/A"],
        "healthLabels": [
            "Sugar-Conscious",
            "Low Potassium",
            "Kidney-Friendly",
            "Keto-Friendly",
            "Vegetarian",
            "Pescatarian",
            "Dairy-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Sulfite-Free",
            "Kosher",
        ],
        "cautions": ["Sulfites"],
    },
    {
        "recipe_id": "f8727cfaf174f942d5821b249cc82693",
        "label": "Georgia Pecan Pie",
        "image": "https://www.edamam.com/web-img/ca4/ca4c5ce2bd23837de75a1af4fde42ebe.jpg",
        "url": "http://www.foodandwine.com/recipes/georgia-pecan-pie",
        "calories": 4640,
        "cookingtime": "N/A",
        "ingredients": [
            "1 cup all-purpose flour",
            "1/2 teaspoon salt",
            "1/2 teaspoon sugar",
            "1 stick (4 ounces) cold unsalted butter, cut into 1/2-inch pieces",
            "1/4 cup ice water",
            "3 large eggs",
            "1 cup sugar",
            "1/4 teaspoon salt",
            "1/2 cup light corn syrup",
            "1/2 cup dark corn syrup",
            "4 tablespoons unsalted butter, melted",
            "1 tablespoon pure vanilla extract",
            "1 1/4 cups pecan halves (5 ounces)",
        ],
        "dietLabels": ["N/A"],
        "healthLabels": [
            "Low Potassium",
            "Kidney-Friendly",
            "Vegetarian",
            "Pescatarian",
            "Peanut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Kosher",
        ],
        "cautions": ["FODMAP"],
    },
    {
        "recipe_id": "97f1064aef354ebcdaacb74710658440",
        "label": "Garlic Bread",
        "image": "https://www.edamam.com/web-img/f0e/f0e29c560d5d70435924122353a2bed0.jpg",
        "url": "http://www.foodandwine.com/recipes/garlic-bread-laurence-jossel",
        "calories": 844,
        "cookingtime": "N/A",
        "ingredients": [
            "Eight 3/4-inch slices of ciabatta",
            "4 tablespoons unsalted butter",
            "2 large garlic cloves, minced",
            "Kosher salt and freshly ground pepper",
            "1/4 cup chopped parsley",
        ],
        "dietLabels": ["N/A"],
        "healthLabels": [
            "Sugar-Conscious",
            "Low Potassium",
            "Kidney-Friendly",
            "Vegetarian",
            "Pescatarian",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Sulfite-Free",
            "Kosher",
        ],
        "cautions": ["N/A"],
    },
    {
        "recipe_id": "1e86ea0472ec234efe04fe7319dc57b2",
        "label": "Negroni Leoni",
        "image": "https://www.edamam.com/web-img/756/756db05ff10805256e08047f89dbdc84.jpg",
        "url": "http://www.bonappetit.com/drinks/cocktails/article/the-negroni-sbagliato",
        "calories": 159,
        "cookingtime": "N/A",
        "ingredients": [
            "1.5 oz. Santa Teresa 1796 rum",
            ".5 oz. Ilegal Joven mezcal",
            ".5 oz. Dolin Sweet vermouth",
            ".25 oz. Campari",
        ],
        "dietLabels": ["Low-Fat", "Low-Sodium"],
        "healthLabels": [
            "Sugar-Conscious",
            "Low Potassium",
            "Kidney-Friendly",
            "Keto-Friendly",
            "Vegan",
            "Vegetarian",
            "Pescatarian",
            "Paleo",
            "Mediterranean",
            "Dairy-Free",
            "Gluten-Free",
            "Wheat-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "No oil added",
            "Kosher",
            "Alcohol-Cocktail",
        ],
        "cautions": ["Wheat"],
    },
    {
        "recipe_id": "c94e1d9720793f96f106073a22800c4f",
        "label": "Smoked Salmon Rillettes",
        "image": "https://www.edamam.com/web-img/37c/37c1c7f310fb6150ed898984d3489df6.jpg",
        "url": "https://www.epicurious.com/recipes/food/views/smoked-salmon-rillettes",
        "calories": 1661,
        "cookingtime": "N/A",
        "ingredients": [
            "1/3 cup finely chopped shallots (about 2 small)",
            "1 cup crème fraîche",
            "1/2 cup (1 stick) unsalted butter, melted",
            "8 ounces smoked salmon",
            "2 teaspoons finely grated lemon zest",
            "4 teaspoons fresh lemon juice",
            "1/2 teaspoon kosher salt",
            "1/2 teaspoon freshly ground white pepper",
            "1/4 cup finely chopped chives, plus more for garnish",
            "Rye crackers and flaky sea salt (for serving)",
        ],
        "dietLabels": ["Low-Carb"],
        "healthLabels": [
            "Sugar-Conscious",
            "Low Potassium",
            "Kidney-Friendly",
            "Keto-Friendly",
            "Pescatarian",
            "Wheat-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Sulfite-Free",
            "Kosher",
        ],
        "cautions": ["Wheat", "Sulfites"],
    },
    {
        "recipe_id": "c28c4be4b720572887254cad4defe8bd",
        "label": "Hummingbird Carrot Cake",
        "image": "https://www.edamam.com/web-img/abc/abc66bcd4b430b9beb371b9eed233fcf",
        "url": "https://www.marthastewart.com/1547123/hummingbird-carrot-cake",
        "calories": 5073,
        "cookingtime": 220.0,
        "ingredients": [
            "1 cup vegetable oil, plus more for brushing",
            "2 cups unbleached all-purpose flour",
            "1 teaspoon baking soda",
            "1 1/2 teaspoons ground cinnamon",
            "1 1/2 teaspoons ground ginger",
            "3/4 teaspoon kosher salt",
            "1 1/2 cups granulated sugar",
            "3 large eggs",
            "2 teaspoons pure vanilla extract",
            "3/4 cup canned diced pineapple in juice, drained and puréed",
            "3 cups finely shredded peeled carrots (from 1 bunch)",
            "1 cup sweetened shredded coconut",
        ],
        "dietLabels": ["N/A"],
        "healthLabels": [
            "Low Potassium",
            "Kidney-Friendly",
            "Vegetarian",
            "Pescatarian",
            "Dairy-Free",
            "Peanut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Kosher",
        ],
        "cautions": ["Sulfites", "FODMAP"],
    },
    {
        "recipe_id": "c0bbeed60261ffa05693313f992f4a4f",
        "label": "Decadent Vegan Brownies",
        "image": "https://www.edamam.com/web-img/39e/39ee33db25473e4302b45da51a8303c0.jpg",
        "url": "https://www.delish.com/cooking/recipe-ideas/a32937034/vegan-brownies-recipe/",
        "calories": 2322,
        "cookingtime": 50.0,
        "ingredients": [
            "4 oz. bittersweet chocolate, roughly chopped",
            "1/3 c. refined coconut oil",
            "1/2 tsp. instant espresso powder (optional)",
            "1/3 c. room temperature unsweetened nondairy milk",
            "1/2 tbsp. corn starch",
            "3/4 c. granulated sugar",
            "1 c. all-purpose flour",
            "1/4 c. dutch process cocoa powder",
            "3/4 tsp. baking powder",
            "1/2 tsp. kosher salt",
        ],
        "dietLabels": ["N/A"],
        "healthLabels": [
            "Low Potassium",
            "Kidney-Friendly",
            "Vegetarian",
            "Pescatarian",
            "Dairy-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Kosher",
        ],
        "cautions": ["Gluten", "Wheat", "Tree-Nuts", "Sulfites"],
    },
    {
        "recipe_id": "0891d1d45b66139829ed2d0c99dce97d",
        "label": "Chicken Parmesan",
        "image": "https://www.edamam.com/web-img/657/65750e0c777585c7cd2ebde9c37824d5.jpg",
        "url": "https://www.marthastewart.com/1079675/chicken-parmesan",
        "calories": 2325,
        "cookingtime": "N/A",
        "ingredients": [
            "6 baked Breaded Chicken Cutlets",
            "12 fresh basil leaves, plus more for serving (optional)",
            "1 1/2 cups homemade or store-bought tomato sauce",
            "1 1/4 cups grated mozzarella",
            "Finely grated Parmesan, for serving",
        ],
        "dietLabels": ["Low-Carb"],
        "healthLabels": [
            "Sugar-Conscious",
            "Keto-Friendly",
            "Mediterranean",
            "Gluten-Free",
            "Wheat-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "No oil added",
            "Sulfite-Free",
            "FODMAP-Free",
        ],
        "cautions": ["Sulfites", "FODMAP"],
    },
    {
        "recipe_id": "e66208d693af3817a20779fe834e0b00",
        "label": "Winter's Revival",
        "image": "https://www.edamam.com/web-img/3f0/3f0b55c1d0de4bd181d2ad39726a637b.jpg",
        "url": "http://www.bonappetit.com/recipe/winters-revival",
        "calories": 44,
        "cookingtime": "N/A",
        "ingredients": [
            "2 ounces coconut water",
            "1/3 ounce lemon juice",
            "1/3 ounce vodka",
            "1/2 teaspoon earl grey simple syrup*",
        ],
        "dietLabels": ["Low-Fat", "Low-Sodium"],
        "healthLabels": [
            "Kidney-Friendly",
            "Keto-Friendly",
            "Vegan",
            "Vegetarian",
            "Pescatarian",
            "Dairy-Free",
            "Gluten-Free",
            "Wheat-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Red-Meat-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "No oil added",
            "Kosher",
            "Alcohol-Cocktail",
        ],
        "cautions": ["Wheat", "Tree-Nuts", "Sulfites"],
    },
]


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
        recipe_id = recipe["uri"].split("recipe_", 1)[1]
        recipe_info = {
            "recipe_id": recipe_id,
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

    return recipes


def recipe_from_id(recipe_id):
    """returns a dictionary of recipe information given a recipe id."""
    url = "https://api.edamam.com/api/recipes/v2/" + recipe_id

    params = {
        "type": "public",
        "app_id": EDAMAM_API_ID,
        "app_key": EDAMAM_API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    try:
        recipe = data["recipe"]
    except KeyError:
        return False

    recipe_info = get_recipe_info(recipe)
    recipe_info = json.dumps(recipe_info)
    return recipe_info


def recommended_recipes():
    return RECOMMENDED_RECIPES
