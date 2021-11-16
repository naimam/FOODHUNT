import unittest
import sys
import os

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

from yelp import get_restaurant_info
from edamam import get_recipe_info

INPUT = "INPUT"
EXPECTED_OUTPUT = "EXPECTED_OUTPUT"


class get_restaurant_search_test1(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                INPUT: {},
                EXPECTED_OUTPUT: (None),
            },
            {
                INPUT: {
                    "id": "U-i6cq-yFRVJC4pIKSLX9Q",
                    "alias": "poor-calvins-atlanta-15",
                    "name": "Poor Calvin's",
                    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/OqNT3uMiq-ZvhkPmJz_2eA/o.jpg",
                    "is_closed": False,
                    "url": "https://www.yelp.com/biz/poor-calvins-atlanta-15?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=buRGvSb5SxSRwVojQ1NvZA",
                    "review_count": 3680,
                    "categories": [
                        {"alias": "asianfusion", "title": "Asian Fusion"},
                        {"alias": "southern", "title": "Southern"},
                        {"alias": "comfortfood", "title": "Comfort Food"},
                    ],
                    "rating": 4.5,
                    "coordinates": {"latitude": 33.7684, "longitude": -84.38226},
                    "transactions": ["delivery", "pickup"],
                    "price": "$$$",
                    "location": {
                        "address1": "510 Piedmont Ave NE",
                        "address2": None,
                        "address3": "",
                        "city": "Atlanta",
                        "zip_code": "30308",
                        "country": "US",
                        "state": "GA",
                        "display_address": ["510 Piedmont Ave NE", "Atlanta, GA 30308"],
                    },
                    "phone": "+14042544051",
                    "display_phone": "(404) 254-4051",
                    "distance": 2634.6047912675276,
                },
                EXPECTED_OUTPUT: {
                    "name": "Poor Calvin's",
                    "id": "U-i6cq-yFRVJC4pIKSLX9Q",
                    "rating": 4.5,
                    "price": "$$$",
                    "url": "https://www.yelp.com/biz/poor-calvins-atlanta-15?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=buRGvSb5SxSRwVojQ1NvZA",
                    "phone": "+14042544051",
                    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/OqNT3uMiq-ZvhkPmJz_2eA/o.jpg",
                    "address": "510 Piedmont Ave NE",
                    "city": "Atlanta",
                    "state": "GA",
                    "zip_code": "30308",
                    "transactions": ["delivery", "pickup"],
                },
            },
        ]

    def test_get_restaurant_info(self):
        for test in self.success_test_params:
            self.assertEqual(get_restaurant_info(test[INPUT]), test[EXPECTED_OUTPUT])


class get_recipe_search_test1(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                INPUT: {},
                EXPECTED_OUTPUT: (None),
            },
            {
                INPUT: {
                    "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_1db961989c3b89b1cd7689b13daf9829",
                    "label": "Japanese 7-Eleven Egg Salad Sandwich",
                    "image": "https://www.edamam.com/web-img/051/051d474a9eb46f52f328c6b00b400e5c.jpg",
                    "source": "Food52",
                    "url": "https://food52.com/recipes/73219-japanese-7-eleven-egg-salad-sandwich",
                    "shareAs": "http://www.edamam.com/recipe/japanese-7-eleven-egg-salad-sandwich-1db961989c3b89b1cd7689b13daf9829/-",
                    "yield": 4.0,
                    "dietLabels": [],
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
                    "ingredientLines": [
                        "2 slices soft white bread (shokupan is best)",
                        "2 hard-boiled eggs",
                        "3 tablespoons kewpie mayonnaise",
                        "salt and pepper, to taste",
                    ],
                    "ingredients": [
                        {
                            "text": "2 slices soft white bread (shokupan is best)",
                            "quantity": 2.0,
                            "measure": "slice",
                            "food": "white bread",
                            "weight": 58.0,
                            "foodCategory": "bread, rolls and tortillas",
                            "foodId": "food_a3049hmbqj5wstaeeb3udaz6uaqv",
                            "image": "https://www.edamam.com/food-img/886/886960f6ce6ccec5b9163bacf2996853.jpg",
                        },
                        {
                            "text": "2 hard-boiled eggs",
                            "quantity": 2.0,
                            "measure": "<unit>",
                            "food": "hard-boiled eggs",
                            "weight": 80.0,
                            "foodCategory": "Eggs",
                            "foodId": "food_a2y52zfbr22uq1ah5thnqac607ft",
                            "image": "https://www.edamam.com/food-img/e54/e54c012fabed0f9cf211a817d1e23c5c.jpg",
                        },
                        {
                            "text": "3 tablespoons kewpie mayonnaise",
                            "quantity": 3.0,
                            "measure": "tablespoon",
                            "food": "mayonnaise",
                            "weight": 43.3124999992677,
                            "foodCategory": "condiments and sauces",
                            "foodId": "food_bu8t61zaplle7dbrzk81dbygq0qj",
                            "image": "https://www.edamam.com/food-img/577/577308a0422357885c94cc9b5f1f1862.jpg",
                        },
                        {
                            "text": "salt and pepper, to taste",
                            "quantity": 0.0,
                            "measure": None,
                            "food": "salt",
                            "weight": 1.087874999995606,
                            "foodCategory": "Condiments and sauces",
                            "foodId": "food_btxz81db72hwbra2pncvebzzzum9",
                            "image": "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg",
                        },
                        {
                            "text": "salt and pepper, to taste",
                            "quantity": 0.0,
                            "measure": None,
                            "food": "pepper",
                            "weight": 0.543937499997803,
                            "foodCategory": "Condiments and sauces",
                            "foodId": "food_b6ywzluaaxv02wad7s1r9ag4py89",
                            "image": "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg",
                        },
                    ],
                    "calories": 579.947783119927,
                    "totalWeight": 181.8564374992655,
                    "totalTime": 20.0,
                },
                EXPECTED_OUTPUT: {
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
            },
        ]

    def test_get_recipe_info(self):
        for test in self.success_test_params:
            self.assertEqual(get_recipe_info(test[INPUT]), test[EXPECTED_OUTPUT])


if __name__ == "__main__":
    unittest.main()
