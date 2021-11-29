"""
Logic for the whole app
"""

# pylint: disable=E1101, C0413, W1508, W0703, R0903, R0914, W0603, W0632, E0237, W0613

import os
import json
from datetime import timedelta
import flask
from flask import send_from_directory, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from dotenv import load_dotenv, find_dotenv


from werkzeug.security import generate_password_hash, check_password_hash
from flask_login.utils import login_required
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    logout_user,
    current_user,
)
import yelp
import edamam
import mealplan

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")
bp = flask.Blueprint("bp", __name__, template_folder="./build")
db = SQLAlchemy(app)
bootstrap = Bootstrap(app)

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("SECRET_KEY")

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_name):
    """Function to retrieve the users username"""
    return User.query.get(user_name)


@app.before_request
def make_session_permanent():
    """Function to make session valid for only 60 minutes"""
    session.permanent = False
    app.permanent_session_lifetime = timedelta(minutes=60)
    db.create_all()


class User(UserMixin, db.Model):
    """Creating database tables for Usernames"""

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    recipes = db.relationship("Recipe", backref="user", lazy=True)
    restaurants = db.relationship("Restaurant", backref="user", lazy=True)
    zipcode = db.Column(db.Integer)
    mealplan = db.relationship("MealPlan", backref="user", lazy=True)

    def get_id(self):
        return self.user_id


class Recipe(db.Model):
    """Creating database for Recipes"""

    rec_id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __repr__(self):
        return f"<Recipe {self.recipe_id}>"


class Restaurant(db.Model):
    """Creating database for Restaurants"""

    res_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __repr__(self):
        return f"<Restaurant {self.restaurant_id}>"


class MealPlan(db.Model):
    """Database for meal planner"""

    mPlan_id = db.Column(db.Integer, primary_key=True)
    plantype = db.Column(
        db.String, nullable=False
    )  # This is either for weekly or daily plans
    mealcount = db.Column(db.Integer, nullable=False)
    breakfast = db.Column(db.ARRAY(db.String))
    lunch = db.Column(db.ARRAY(db.String))
    dinner = db.Column(db.ARRAY(db.String))
    brunch = db.Column(db.ARRAY(db.String))
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"))

    def __repr__(self):
        return f"<MealPlan {self.mPlan_id}>"


class LoginForm(FlaskForm):
    """Form to allow user to type in their credentials to login"""

    username = StringField(
        "username",
        validators=[InputRequired(), Length(min=4, max=15)],
        render_kw={"placeholder": "Username"},
    )
    password = PasswordField(
        "password",
        validators=[InputRequired(), Length(min=8, max=80)],
        render_kw={"placeholder": "Password"},
    )


class SignupForm(FlaskForm):
    """Form to allow user to signup for a profile"""

    email = StringField(
        "email",
        validators=[InputRequired(), Email(message="Invalid email"), Length(max=50)],
        render_kw={"placeholder": "Email Address"},
    )
    username = StringField(
        "username",
        validators=[InputRequired(), Length(min=4, max=15)],
        render_kw={"placeholder": "Username"},
    )
    password = PasswordField(
        "password",
        validators=[InputRequired(), Length(min=8, max=80)],
        render_kw={"placeholder": "Password"},
    )


@app.route("/")
@login_required
def root():
    """Function to reroute user to homepage"""
    return flask.redirect(flask.url_for("bp.home"))


@bp.route("/home")
@login_required
def home():
    """Function to display the users informationon the home page"""
    user_data = {"username": current_user.username}
    data = json.dumps(user_data)
    return flask.render_template(
        "index.html",
        data=data,
    )


@app.route("/<path:path>", methods=["GET"])
@login_required
def any_root_path(path):
    """Function to reroute a newly logged in user to the index.html or homepage"""
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Function to allow a user to signup for a profile on this app"""
    failed = False
    form = SignupForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data, method="sha256")
        new_user = User(
            username=form.username.data, password=hashed_password, email=form.email.data
        )

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError as err:
            db.session.rollback()
            app.logger.debug(err)
            failed = True
            if (
                'duplicate key value violates unique constraint "user_username_key"'
                in str(err)
            ):
                flash("Username already exist", "danger")
        if not failed:
            form.email.data = ""
            form.username.data = ""
            form.password.data = ""
            flash("Welcome to Food Hunt!!", "success")

    return flask.render_template("signup.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Function to allow user to login to their profile if it is in the database"""
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                app.logger.info("%s logged in successfully", current_user.username)
                return flask.redirect(flask.url_for("bp.home"))
        flash("Invalid username or password.", "error")
    return flask.render_template("login.html", form=form)


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    """Function to allow the user to logout of their profile"""
    app.logger.debug("logging out user: " + current_user.username)
    session.clear()
    logout_user()
    return redirect(url_for("login"))


@app.route("/get-username", methods=["GET"])
@login_required
def get_username():
    """Function to retrieve the username"""
    return {"username": current_user.username}


@app.route("/get-zipcode", methods=["GET"])
@login_required
def get_zipcode():
    """Function to retrieve the user's zipcode"""
    return {"zipcode": current_user.zipcode}


@app.route("/update-zipcode", methods=["POST"])
@login_required
def update_zipcode():
    """Function to update the user's zip code"""
    input_zipcode = flask.request.json.get("zipcode")
    current_user.zipcode = input_zipcode
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        app.logger.debug(err)
        return {"error": True}
    return {"error": False}


# API"""


@app.route("/api/save-recipe", methods=["POST"])
@login_required
def save():
    """Function to save a recipe to the favorites page"""
    recipe_id = flask.request.json.get("recipe_id")
    app.logger.info("SAVING: %s", recipe_id)
    db.session.add(Recipe(recipe_id=recipe_id, user_id=current_user.user_id))
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        app.logger.debug(err)
        return {"error": True}
    return {"error": False}


@app.route("/api/save-restaurant", methods=["POST"])
@login_required
def save_resta():
    """Function to save a restaurant to the favorites page"""
    restaurant_id = flask.request.json.get("restaurant_id")
    app.logger.info("SAVING: %s", restaurant_id)

    db.session.add(
        Restaurant(restaurant_id=restaurant_id, user_id=current_user.user_id)
    )
    try:
        db.session.commit()
    except Exception as err:
        db.session.rollback()
        app.logger.debug(err)
        return {"error": True}
    return {"error": False}


@app.route("/api/remove-recipe", methods=["POST"])
@login_required
def remove_recipe():
    """Function to remove a favorite recipe if shown in favorites page"""
    recipe_id = flask.request.json.get("recipe_id")
    app.logger.info("REMOVING: %s", recipe_id)
    try:
        recipe = Recipe.query.filter_by(
            recipe_id=recipe_id, user_id=current_user.user_id
        ).first()
        db.session.delete(recipe)
        db.session.commit()
    except Exception as error:
        app.logger.error(error)
        return json.dumps({"error": True})
    return json.dumps({"error": False})


@app.route("/api/remove-restaurant", methods=["POST"])
@login_required
def remove_restaurant():
    """Function to remove a favorite restaurant if shown in favorites page"""
    restaurant_id = flask.request.json.get("restaurant_id")
    app.logger.info("REMOVING: %s", restaurant_id)
    try:
        restaurant = Restaurant.query.filter_by(
            restaurant_id=restaurant_id, user_id=current_user.user_id
        ).first()
        db.session.delete(restaurant)
        db.session.commit()
    except Exception as error:
        app.logger.error(error)
        return json.dumps({"error": True})
    return json.dumps({"error": False})


@app.route("/api/search-for-restaurant", methods=["POST"])
@login_required
def search_for_restaurant():
    """Function to search for a restaurant based on keyowrd and zipcode"""
    keyword = flask.request.json.get("keyword")
    zipcode = flask.request.json.get("zip")
    data = yelp.restaurant_search(keyword, zipcode)

    if not data:
        return {"error": True}
    user_restaurants = current_user.restaurants
    already_saved = [x.restaurant_id for x in user_restaurants]
    for i in data:
        res_id = i["id"]
        i["already_saved"] = False
        if res_id in already_saved:
            i["already_saved"] = True
    return json.dumps({"error": False, "data": json.dumps(data)})


@app.route("/api/search-for-recipe", methods=["POST"])
@login_required
def search_for_recipe():
    """Function to search for a recipe based on keyword"""
    keyword = flask.request.json.get("keyword")
    data = edamam.recipe_search(keyword)
    if not data:
        return {"error": True}
    user_recipes = current_user.recipes
    already_saved = [x.recipe_id for x in user_recipes]
    for i in data:
        rec_id = i["recipe_id"]
        i["already_saved"] = False
        if rec_id in already_saved:
            i["already_saved"] = True
    return json.dumps({"error": False, "data": json.dumps(data)})


@app.route("/api/recommended-recipes", methods=["POST"])
@login_required
def recommended_recipes():
    """Function to retrieve a random list of recommended recipes"""
    data = edamam.recommended_recipes()
    return {"error": False, "data": data}


@app.route("/api/recommended-restaurants", methods=["POST"])
@login_required
def recommended_restaurants():
    """Function to retrieve a random list of recommended restaurants"""
    # zip = flask.request.json.get("zip")
    data = yelp.recommended_restaurants()
    if not data:
        return {"error": True}
    return {"error": False, "data": data}


@app.route("/api/favorite-recipes", methods=["POST", "GET"])
@login_required
def favorite_recipes():
    """Function to store a users favorite recipe"""
    user = User.query.filter_by(user_id=current_user.user_id).first()
    user_recipes = user.recipes
    if user_recipes:

        recipe_info = []
        for i in user_recipes:
            recipe_info.append(edamam.recipe_from_id(i.recipe_id))
        data = {"error": False, "data": recipe_info}
        return data
    return {"error": True}


@app.route("/api/favorite-restaurants", methods=["POST", "GET"])
@login_required
def favorite_restaurants():
    """Function to store a users favorite restaurant"""
    user = User.query.filter_by(user_id=current_user.user_id).first()
    user_restaurants = user.restaurants
    if user_restaurants:

        restaurant_info = []
        for i in user_restaurants:
            restaurant_info.append(yelp.restaurant_from_id(i.restaurant_id))
        data = {"error": False, "data": restaurant_info}
        return data
    return {"error": True}


# MEAL PLANNER
@app.route("/api/get-mealplan", methods=["POST"])
@login_required
def get_mealplan():
    """Function to get a meal plan from edamam based on user's input"""
    meals = flask.request.json.get("meals")
    plan_type = flask.request.json.get("plan_type")
    calories = flask.request.json.get("calories")
    diet = flask.request.json.get("diet")
    health = flask.request.json.get("health")
    if not meals or not plan_type or not calories or not diet:
        return {"error": True}

    cal_lower = calories["min"]
    cal_upper = calories["max"]

    plan = mealplan.meal_plan(meals, plan_type, cal_lower, cal_upper, diet, health)
    if plan:
        return {"error": False, "data": plan}
    return {"error": True}


@app.route("/api/save-mealplan", methods=["POST"])
@login_required
def save_mealplan():
    """Function to save a meal plan from the meal planner page to database"""
    user = User.query.filter_by(user_id=current_user.user_id).first()
    meal_count = flask.request.json.get("meal_count")
    plan_type = flask.request.json.get("plan_type")
    plan = flask.request.json.get("meal_plan")
    if plan:
        if meal_count == 2:
            db.session.add(
                MealPlan(
                    plantype=plan_type,
                    mealcount=meal_count,
                    brunch=plan["brunch"],
                    dinner=plan["dinner"],
                    user_id=user.user_id,
                )
            )
        else:
            db.session.add(
                MealPlan(
                    plantype=plan_type,
                    mealcount=meal_count,
                    breakfast=plan["breakfast"],
                    lunch=plan["lunch"],
                    dinner=plan["dinner"],
                    user_id=user.user_id,
                )
            )
        db.session.commit()
        return {"error": False}

    return {"error": True}


@app.route("/api/fetch-mealplan", methods=["POST"])
@login_required
def fetch_mealplan():
    """Function to retrieve a users meal plan from database"""
    user = User.query.filter_by(user_id=current_user.user_id).first()
    user_meal_plan = user.mealplan
    if user_meal_plan:
        data = {}
        data["plan_type"] = user_meal_plan.plantype
        data["meal_count"] = user_meal_plan.mealcount
        dinner = []
        for i in user_meal_plan.dinner:
            dinner.append(edamam.recipe_from_id(i))
        data["dinner"] = dinner

        if user_meal_plan.mealcount == 2:
            brunch = []
            for i in user_meal_plan.brunch:
                brunch.append(edamam.recipe_from_id(i))
            data["brunch"] = brunch
        else:
            breakfast = []
            for i in user_meal_plan.breakfast:
                breakfast.append(edamam.recipe_from_id(i))
            data["breakfast"] = breakfast
            lunch = []
            for i in user_meal_plan.lunch:
                lunch.append(edamam.recipe_from_id(i))
            data["lunch"] = lunch

            return {"error": False, "data": data}
    return {"error": True}


# ASSETS
@app.route("/favicon.ico")
def favicon():
    """Function to retireve the app's icon"""
    return send_from_directory("./build", "favicon.ico")


@app.route("/tomato.png")
def tomato():
    """Function to retireve the tomato image"""
    return send_from_directory("./build", "tomato.png")


@app.route("/pepper.png")
def pepper():
    """Function to retireve the pepper image"""
    return send_from_directory("./build", "pepper.png")


def query_favorite_recipes(uid):
    """Query favorite recipes from database"""
    user = User.query.filter_by(user_id=uid).first()
    user_recipes = user.recipes
    if user_recipes:
        recipe_info = []
        for i in user_recipes:
            recipe_info.append(edamam.recipe_from_id(i.recipe_id))
        data = {"error": False, "data": recipe_info}
        return data
    return {"error": True}


def save_recipe(uid, rid):
    """Saves recipe id to the database"""
    db.session.add(Recipe(recipe_id=rid, user_id=uid))
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return {"error": True}
    return {"error": False}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)), debug=True)
