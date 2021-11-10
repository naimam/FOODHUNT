import React from 'react';
import RecipeInfo from './RecipeInfo';
import { useState } from 'react';
import { Button, Card, Row, Col, Accordion } from 'react-bootstrap';
import './Recipe.css';


// mock data
var d1 = {
    "label": "Creamy Spinach and Artichoke Dip",
    "ingredients": ["spiniach", "artichoke"],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "url": "https://www.google.com/",
    "calories": "100",
    "cookingtime": "60",
    "dietLabels": ["Low-Carb", "Lactose"],
    "healthLabels": ["Vegan", "Vegetarian"],
    "cautions": ["Sulfites"],
}
var d2 = {
    "label": "Pizza",
    "ingredients": ["cheese", "tomato", "sauce"],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "url": "https://www.google.com/",
    "calories": "200",
    "cookingtime": "60",
    "dietLabels": ["High-Carb", "Yo Mama"],
    "healthLabels": ["Vegadwdn", "Vegetarian"],
    "cautions": ["Sulfitdwdes"],
}
var d3 = {
    "label": "Spaghetti",
    "ingredients": ["noodles", "tomato", "sauce"],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "url": "https://www.google.com/",
    "calories": "300",
    "cookingtime": "60",
    "dietLabels": ["Low-Carb", "fwefe"],
    "healthLabels": ["Spahg", "Vegetarian"],
    "cautions": ["Sulfites"],
}
var d4 = {
    "label": "Spaghetti",
    "ingredients": ["noodles", "tomato", "sauce"],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "url": "https://www.google.com/",
    "calories": "300",
    "cookingtime": "60",
    "dietLabels": ["Low-Carb", "fwefe"],
    "healthLabels": ["Spahg", "Vegetarian"],
    "cautions": ["Sulfites"],
}
var d5 = {
    "label": "Spaghetti",
    "ingredients": ["noodles", "tomato", "sauce"],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    "url": "https://www.google.com/",
    "calories": "300",
    "cookingtime": "60",
    "dietLabels": ["Low-Carb", "fwefe"],
    "healthLabels": ["Spahg", "Vegetarian"],
    "cautions": ["Sulfites"],
}
var data = [d1, d2, d3, d4, d5]; //mock data



function Recipe(props) {
    var results = data;
    const display = results.map((item) => (
        <Col className="recipe-col" >
            <Card className="recipe-item">
                <div className="display">
                    <Card.Img variant="top" className="recipe-image" src={item.image} alt={item.label} />

                    <Card.Body>
                        <Card.Title className="recipe-label">{item.label}</Card.Title>
                        <div className="recipe-calories">{item.calories} calories</div>
                        <div className="recipe-cookingtime">{item.cookingtime} minutes to make</div>
                        <div className="recipe-url"><a href="{item.url}"> Recipe Instructions</a></div>
                        {/* to add: save button */}

                        <Accordion>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>More Information</Accordion.Header>
                                <Accordion.Body>
                                    <div className="recipe-info">
                                        <div className="recipe-ingredients">
                                            <div className="recipe-ingredient-title">Ingredients</div>
                                            <ul className="recipe-ingredient-list">
                                                {item.ingredients.map((ingredient) => (
                                                    <li className="recipe-ingredient">{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="recipe-health-labels">
                                            <div className="recipe-health-label-title">Health Labels</div>
                                            <ul className="recipe-health-label-list">
                                                {item.healthLabels.map((healthLabel) => (
                                                    <li className="recipe-health-label">{healthLabel}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="recipe-diet-labels">
                                            <div className="recipe-diet-label-title">Diet Labels</div>
                                            <ul className="recipe-diet-label-list">
                                                {item.dietLabels.map((dietLabel) => (
                                                    <li className="recipe-diet-label">{dietLabel}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="recipe-cautions">
                                            <div className="recipe-cautions-title">Cautions</div>
                                            <ul className="recipe-cautions-list">
                                                {item.cautions.map((cautions) => (
                                                    <li className="recipe-cautions">{cautions}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </div>
            </Card >
        </Col >

    ));



    return (
        // <div className={showResults ? "show" : "hide"}>{display}</div>
        <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 recipe-row">{display}</Row>
    );
}


export default Recipe;