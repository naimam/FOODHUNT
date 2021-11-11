"""yelp.py: returns list of information on resturants given location and term. using yelp api.  """
import os
import json
from dotenv import find_dotenv, load_dotenv
import requests


load_dotenv(find_dotenv())

YELP_API_KEY = os.getenv("YELP_API_KEY")


def get_resturant_info(resturant):
    """returns dictionary of information given a resturant"""
    try:
        resturant_info = {
            "name": resturant["name"],
            "id": resturant["id"],
            "rating": resturant["rating"],
            "price": resturant["price"],
            "url": resturant["url"],
            "phone": resturant["phone"],
            "image_url": resturant["image_url"],
            "address": resturant["location"]["address1"],
            "city": resturant["location"]["city"],
            "state": resturant["location"]["state"],
            "zip_code": resturant["location"]["zip_code"],
            "distance:": resturant["distance"],
            "transactions": resturant["transactions"],
        }
    except KeyError:
        resturant_info = None
    return resturant_info


def resturant_search(term, zip):
    """returns list of dictionaries of resturants given location and term."""

    location = str(zip) + get_state_from_zip(zip)

    url = "https://api.yelp.com/v3/businesses/search"
    headers = {"Authorization": "Bearer %s" % YELP_API_KEY}
    params = {
        "term": term,
        "location": location,
        "category": "restaurants, all",
    }
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    try:
        results = data["businesses"]
    except KeyError:  # invalid location
        return False

    if results:
        resturants = [get_resturant_info(resturant) for resturant in results]
        resturants = [
            resturant for resturant in resturants if resturant is not None
        ]  # filter out None values
    else:
        return False

    resturants_info = json.dumps(resturants[:10])
    return resturants_info


# for more accurate results from yelp
def get_state_from_zip(zip):
    response = requests.get("http://api.zippopotam.us/us/" + str(zip))
    json = response.json()
    return json["places"][0]["state abbreviation"]
