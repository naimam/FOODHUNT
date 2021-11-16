# pylint: disable=E1101, C0413, W1508, W0703, R0903, R0914, W0603, W0632, C0301
"""yelp.py: returns list of information on restaurants given location and term. using yelp api.  """
import os
import json
from dotenv import find_dotenv, load_dotenv
import requests


load_dotenv(find_dotenv())

YELP_API_KEY = os.getenv("YELP_API_KEY")
RECOMMENDED_RESTAURANTS = [
    {
        "name": "Poor Calvin's",
        "id": "U-i6cq-yFRVJC4pIKSLX9Q",
        "rating": 4.5,
        "price": "$$$",
        "url": "https://www.yelp.com/biz/poor-calvins-atlanta-15?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14042544051",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/OqNT3uMiq-ZvhkPmJz_2eA/o.jpg",
        "address": "510 Piedmont Ave NE",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30308",
        "transactions": ["pickup", "delivery"],
    },
    {
        "name": "South City Kitchen Midtown",
        "id": "eG-UO83g_5zDk70FIJbm2w",
        "rating": 4.5,
        "price": "$$",
        "url": "https://www.yelp.com/biz/south-city-kitchen-midtown-atlanta-2?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14048737358",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/L1qX2ttHqvNMqgsw_JQNLQ/o.jpg",
        "address": "1144 Crescent Ave NE",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30309",
        "transactions": ["delivery"],
    },
    {
        "name": "Atlanta Breakfast Club",
        "id": "GJxFtnTqTiokFedNrW9iDQ",
        "rating": 4.5,
        "price": "$$",
        "url": "https://www.yelp.com/biz/atlanta-breakfast-club-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14704283825",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/cGL6b-pSEqzaNrF32gXd2w/o.jpg",
        "address": "249 Ivan Allen Jr Blvd",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30313",
        "transactions": ["pickup", "delivery"],
    },
    {
        "name": "The Food Shoppe",
        "id": "23UWCyB8UnPu-0t-67iEKA",
        "rating": 4.5,
        "price": "$$",
        "url": "https://www.yelp.com/biz/the-food-shoppe-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14046008443",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/TeCMzM8CRCa21rA_KZQaGw/o.jpg",
        "address": "123 Luckie St NW",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30303",
        "transactions": ["pickup"],
    },
    {
        "name": "There on Fifth",
        "id": "A9IAWSzO-RWaSSOeiYXUCg",
        "rating": 5.0,
        "price": "$$",
        "url": "https://www.yelp.com/biz/there-on-fifth-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+16787055021",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/0neuw1YvJQ3Lred6gvtmTw/o.jpg",
        "address": "22 5th St NW",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30308",
        "transactions": ["pickup"],
    },
    {
        "name": "Aviva by Kameel - Atlanta",
        "id": "BSUDAiXd50PAkfFAztVpDw",
        "rating": 5.0,
        "price": "$$",
        "url": "https://www.yelp.com/biz/aviva-by-kameel-atlanta-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14046983600",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/_x61pM4WZiji4d2jq1GnYw/o.jpg",
        "address": "225 Peachtree St NE",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30303",
        "transactions": ["pickup", "delivery"],
    },
    {
        "name": "Blossom Tree",
        "id": "JTGjHr9ii1TWq0TNLFkiQw",
        "rating": 4.5,
        "price": "$$",
        "url": "https://www.yelp.com/biz/blossom-tree-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14042237500",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/JSvShvXLDWzD5XPKFDUMNQ/o.jpg",
        "address": "64 Peachtree St NW",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30303",
        "transactions": ["pickup", "delivery"],
    },
    {
        "name": "Amalfi Pizza",
        "id": "Slj9yz_RfDRqiMRH8VxUMQ",
        "rating": 4.0,
        "price": "$$",
        "url": "https://www.yelp.com/biz/amalfi-pizza-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14042287528",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/wOcBWyV-eYQTzxPU5gQ-VQ/o.jpg",
        "address": "17 Andrew Young International Blvd NE",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30303",
        "transactions": ["delivery"],
    },
    {
        "name": "Baraka Shawarma",
        "id": "_BNuP4qFCrUxBt2dGpUMaA",
        "rating": 4.5,
        "price": "$$",
        "url": "https://www.yelp.com/biz/baraka-shawarma-atlanta?adjust_creative=buRGvSb5SxSRwVojQ1NvZA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=buRGvSb5SxSRwVojQ1NvZA",
        "phone": "+14042309232",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/_7Ag5oHjcoDoB-5tXaBXWQ/o.jpg",
        "address": "68 Walton St NW",
        "city": "Atlanta",
        "state": "GA",
        "zip_code": "30303",
        "transactions": ["pickup", "delivery"],
    },
]


def get_restaurant_info(restaurant):
    """returns dictionary of information given a restaurant"""
    try:
        restaurant_info = {
            "name": restaurant["name"],
            "id": restaurant["id"],
            "rating": restaurant["rating"],
            "price": restaurant["price"],
            "url": restaurant["url"],
            "phone": restaurant["phone"],
            "image_url": restaurant["image_url"],
            "address": restaurant["location"]["address1"],
            "city": restaurant["location"]["city"],
            "state": restaurant["location"]["state"],
            "zip_code": restaurant["location"]["zip_code"],
            "transactions": restaurant["transactions"],
        }
    except KeyError:
        restaurant_info = None
    return restaurant_info


def restaurant_search(term, zipcode, limit=10):
    """returns list of dictionaries of restaurants given location and term."""

    location = str(zipcode) + " " + get_state_from_zip(zipcode)

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
        restaurants = [get_restaurant_info(restaurant) for restaurant in results]
        restaurants = [
            restaurant for restaurant in restaurants if restaurant is not None
        ]  # filter out None values
    else:
        return False

    return restaurants[:limit]


# for more accurate results from yelp
def get_state_from_zip(zipcode):
    """Function to retrieve the state based on the zipcode given from the user"""
    response = requests.get("http://api.zippopotam.us/us/" + str(zipcode))
    zipcoding = response.json()
    return zipcoding["places"][0]["state abbreviation"]


def restaurant_from_id(restaurant_id):
    """returns dictionary of restaurant information given a restaurant id"""
    url = "https://api.yelp.com/v3/businesses/" + restaurant_id
    headers = {"Authorization": "Bearer %s" % YELP_API_KEY}
    response = requests.get(url, headers=headers)
    data = response.json()
    restaurant = get_restaurant_info(data)
    restaurant_info = json.dumps(restaurant)
    return restaurant_info


def recommended_restaurants(zipcode=None):
    """
    Function that returns either a search of restaurants if the user decided to
    or just return recommended restaurants
    """
    if zipcode:
        return restaurant_search("", zipcode, limit=6)
    return RECOMMENDED_RESTAURANTS
