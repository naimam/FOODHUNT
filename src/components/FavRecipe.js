import React from 'react';
import { Button, Card, Row, Col, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react';
import { faSave } from '@fortawesome/free-solid-svg-icons'
import './Recipe.css';


function Recipe(props) {

    var item = JSON.parse(props.recipe);
    function removeRecipe(recipe_id) {
        console.log(recipe_id)

        fetch(`${process.env.PUBLIC_URL}/api/remove-recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "recipe_id": recipe_id })
        }).then(response => response.json()).then(data => {
            console.log(data)
            if (!data.error) { /* if no error */
                props.remove()
            } else {
                //TODO show error message
            }
        });
    }
    console.log("item,", item)
    return (
        <>
            <Col className="recipe-col" >
                <Card className="recipe-item">
                    <div className="display">
                        <Card.Img variant="top" className="recipe-image" src={item.image} alt={item.label} />

                        <Card.Body>
                            <Card.Title className="recipe-label">{item.label}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="recipe-calories"><b>Calories:</b> {item.calories}. </ListGroup.Item>
                                <ListGroup.Item className="recipe-cookingtime"><b>Cooking Time:</b> {item.cookingtime} mins.</ListGroup.Item>
                                <ListGroup.Item className="recipe-health-labels"><b>Health Labels:</b>  {item.healthLabels.slice(0, 5).map((healthLabel) => (
                                    <span className="recipe-health-label">{healthLabel}</span>
                                ))}
                                </ListGroup.Item>
                                <ListGroup.Item className="recipe-diet-labels"><b>Diet Labels:</b>  {item.dietLabels.slice(0, 5).map((dietLabel) => (
                                    <span className="recipe-diet-label">{dietLabel}</span>
                                ))}
                                </ListGroup.Item>
                                <ListGroup.Item className="recipe-cautions"><b>Cautons:</b>   {item.cautions.slice(0, 5).map((cautions) => (
                                    <span className="recipe-cautions">{cautions}</span>
                                ))}
                                </ListGroup.Item>
                            </ListGroup>
                            <Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header> <div className="more-info">Ingredients</div></Accordion.Header>
                                    <Accordion.Body>
                                        <div className="recipe-ingredients">
                                            <ol className="recipe-ingredient-list">
                                                {item.ingredients.map((ingredient) => (
                                                    <li className="recipe-ingredient">{ingredient}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <a href={item.url}> <Button className="info-btn" variant="info">Recipe Info</Button></a>
                            <Button className="deleteBtn" variant="danger" onClick={() => removeRecipe(item.recipe_id)}>Delete</Button >


                        </Card.Body>
                    </div>
                </Card >
            </Col >
        </>
    );
}


export default Recipe;