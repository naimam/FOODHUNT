import unittest
from unittest.mock import MagicMock, patch
import sys
import os

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

from app import db, User, Recipe, save_recipe


class UserDBTests(unittest.TestCase):
    def setUp(self):
        self.db_mock = [
            User(username="test", email="test@gmail.com", password="password")
        ]

    def mock_add_to_db(self, user):
        self.db_mock.append(user)

    def mock_db_commit(self):
        pass

    def test_add_User(self):
        with patch("app.db.session.add", self.mock_add_to_db):
            with patch("app.db.session.commit", self.mock_db_commit):
                # Test adding new user
                new_user = User(
                    username="test2", email="test2@gmail.com", password="password"
                )
                db.session.add(new_user)
                self.assertEqual(len(self.db_mock), 2)
                self.assertEqual(self.db_mock[1].username, "test2")
                self.assertEqual(self.db_mock[1].email, "test2@gmail.com")


class RecipeDBTests(unittest.TestCase):
    def setUp(self):
        self.db_mock = [
            Recipe(recipe_id="1db961989c3b89b1cd7689b13daf9829", user_id=1),
            Recipe(recipe_id="f8727cfaf174f942d5821b249cc82693", user_id=1),
        ]

    def mock_add_to_db(self, recipe):
        self.db_mock.append(recipe)

    def mock_db_commit(self):
        pass

    def test_add_Recipe(self):
        with patch("app.db.session.add", self.mock_add_to_db):
            with patch("app.db.session.commit", self.mock_db_commit):
                # Test adding a valid recipe to the database
                save_recipe(1, "97f1064aef354ebcdaacb74710658440")
                self.assertEqual(len(self.db_mock), 3)
                self.assertEqual(
                    self.db_mock[2].recipe_id, "97f1064aef354ebcdaacb74710658440"
                )
                self.assertEqual(self.db_mock[2].user_id, 1)
                # Test adding an invalid recipe to the database
                self.assertEqual(save_recipe(1, "seffwef"), {"error": False})


if __name__ == "__main__":
    unittest.main()
