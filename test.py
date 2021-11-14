from app import db, User, Recipe, Restaurant
import yelp, edamam

hello = User(username="no", email="no@gmail.com", password="password")
db.session.add(hello)
user = User.query.filter_by(username="hello").first()

db.session.add(Recipe(recipe_id="eG-UO83g_5zDk70FIJbm2w", user_id=user.user_id))
db.session.add(Restaurant(restaurant_id="GJxFtnTqTiokFedNrW9iDQ", user_id=user.user_id))

db.session.commit()

print(user.recipes)

# def favorite_restaurants():
#     user_restaurants = user.restaurants
#     if user_restaurants:
#         restaurants = [x.restaurant_id for x in user_restaurants]
#         print("restaurants", restaurants)

#         restaurant_info = []
#         for i in restaurants:
#             restaurant_info.append(yelp.restaurant_from_id((i)))

#         print("restaurant info", restaurant_info)

#         return restaurant_info
#     return False


# favorite_restaurants()
