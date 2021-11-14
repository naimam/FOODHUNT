import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

function Favorites(props) {
    const [recipeData, setRecipeData] = useState([])
    const [restaurantData, setRestaurantData] = useState([])
    
    user = User.query.filter_by(username=current_user.username).first()
    current_user_restaurants = user.restaurants
    current_user_restaurant_ids = []
    
    recipe_id = flask.request.json.get("recipe_ids")
    
    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/recipe_id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRecipeData(data.data)
        });

        fetch(`${process.env.PUBLIC_URL}/api/restaurant_id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "zip": null })
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRestaurantData(data.data)
        });
    }, []);


export default Favorites
