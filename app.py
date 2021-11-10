import flask
from flask_bcrypt import Bcrypt
from flask import request, redirect, url_for, flash, session
import os
import json
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import yelp
import edamam

load_dotenv(find_dotenv())

from werkzeug.security import generate_password_hash, check_password_hash
from flask_login.utils import login_required
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)

app = flask.Flask(__name__, static_folder="./build/static")
bp = flask.Blueprint("bp", __name__, template_folder="./build")
db = SQLAlchemy(app)

db_url = os.getenv("DATABASE_URL")
# if the database url startwith postgres: this will change it to postsql
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("SECRET_KEY")

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_name):
    return User.query.get(user_name)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.LargeBinary(60), nullable=False)


@app.route("/")
def root():
    return flask.redirect(flask.url_for("bp.home"))


@bp.route("/home")
def home():
    # TODO: insert the data fetched by your app main page here as a JSON
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


app.register_blueprint(bp)


@app.route("/<path:path>", methods=["GET"])
def any_root_path(path):
    return flask.render_template("index.html")


@app.route("/login")
def login():
    return flask.render_template("login.html")


@app.route("/signup")
def signup():
    return flask.render_template("signup.html")


# API


@app.route("/api/search-for-recipe", methods=["POST"])
def test():
    keyword = flask.request.json.get("keyword")
    data = edamam.recipe_search(keyword)
    if len(data) == 0:
        return {"error": True}
    else:
        return {"error": False, "data": data}


@app.route("/api/search-for-restaurant", methods=["POST"])
def search_for_restaurant():
    keyword = flask.request.json.get("keyword")
    zip = flask.request.json.get("zip")
    data = yelp.resturant_search(keyword, zip)
    if len(data) == 0:
        return {"error": True}
    else:
        return {"error": False, "data": data}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8080)), debug=True)
