import flask
from flask import request, send_from_directory, redirect, url_for, flash, session
import os
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta

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
import yelp
import edamam

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
    return User.query.get(user_name)


# make login session to last only 1 hr
@app.before_request
def make_session_permanent():
    session.permanent = False
    app.permanent_session_lifetime = timedelta(minutes=60)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))


class LoginForm(FlaskForm):
    username = StringField(
        "username", validators=[InputRequired(), Length(min=4, max=15)]
    )
    password = PasswordField(
        "password", validators=[InputRequired(), Length(min=8, max=80)]
    )


class SignupForm(FlaskForm):
    email = StringField(
        "email",
        validators=[InputRequired(), Email(
            message="Invalid email"), Length(max=50)],
    )
    username = StringField(
        "username", validators=[InputRequired(), Length(min=4, max=15)]
    )
    password = PasswordField(
        "password", validators=[InputRequired(), Length(min=8, max=80)]
    )


@app.route("/")
@login_required
def root():
    return flask.redirect(flask.url_for("bp.home"))


@bp.route("/home")
@login_required
def home():
    # TODO: insert the data fetched by your app main page here as a JSON
    DATA = {"username": current_user.username}
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )


@app.route("/<path:path>", methods=["GET"])
@login_required
def any_root_path(path):
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/signup", methods=["GET", "POST"])
def signup():
    failed = False
    form = SignupForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(
            form.password.data, method="sha256")
        new_user = User(username=form.username.data, password=hashed_password)
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
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                app.logger.info("%s logged in successfully",
                                current_user.username)
                return flask.redirect(flask.url_for("bp.home"))
        flash("Invalid username or password.", "error")
    return flask.render_template("login.html", form=form)


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    app.logger.debug("logging out user: " + current_user.username)
    session.clear()
    logout_user()
    return redirect(url_for("login"))


# API


@login_required
@app.route("/api/search-for-recipe", methods=["POST"])
def search_for_recipe():
    keyword = flask.request.json.get("keyword")
    data = edamam.recipe_search(keyword)
    if not data:
        return {"error": True}
    else:
        return {"error": False, "data": data}


@login_required
@app.route("/api/search-for-restaurant", methods=["POST"])
def search_for_restaurant():
    keyword = flask.request.json.get("keyword")
    zip = flask.request.json.get("zip")
    data = yelp.resturant_search(keyword, zip)
    if not data:
        return {"error": True}
    else:
        return json.dumps({"error": False, "data": data})


@app.route("/favicon.ico")
def favicon():
    return send_from_directory("./build", "favicon.ico")


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8081)), debug=True)


@app.before_first_request
def create_table():
    """create table"""
    db.create_all()


app.run(debug=True)
