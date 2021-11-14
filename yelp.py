"""yelp.py: returns list of information on resturants given location and term. using yelp api.  """
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
]


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
            "transactions": resturant["transactions"],
        }
    except KeyError:
        resturant_info = None
    return resturant_info


def resturant_search(term, zip, limit=10):
    """returns list of dictionaries of resturants given location and term."""

    location = str(zip) + " " + get_state_from_zip(zip)

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

    return resturants[:limit]


# for more accurate results from yelp
def get_state_from_zip(zip):
    response = requests.get("http://api.zippopotam.us/us/" + str(zip))
    json = response.json()
    return json["places"][0]["state abbreviation"]


def restaurant_from_id(resturant_id):
    """returns dictionary of resturant information given a resturant id"""
    url = "https://api.yelp.com/v3/businesses/" + resturant_id
    headers = {"Authorization": "Bearer %s" % YELP_API_KEY}
    response = requests.get(url, headers=headers)
    data = response.json()
    resturant = get_resturant_info(data)
    resturant_info = json.dumps(resturant)
    return resturant_info


def recommended_restaurants(zip=None):
    if zip:
        return resturant_search("", zip, limit=6)
    else:
        return json.dumps(RECOMMENDED_RESTAURANTS)
