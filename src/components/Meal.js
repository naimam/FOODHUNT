import React from 'react';
import {
    Button, Card, Col, Accordion, ListGroup,
} from 'react-bootstrap';
import './Recipe.css';

const Meal = function (props) {
    console.log(JSON.stringify(props.mealLabel));
    console.log(JSON.stringify(props.mealRecipe));
    const item = props.mealRecipe;

    return (
        <Col className="recipe-col meal-col">
            <h4 className="meal-label">{props.mealLabel}</h4>
            <Card className="recipe-item">
                <div className="display">
                    <Card.Img variant="top" className="recipe-image" src={item.image} alt={item.label} />

                    <Card.Body>
                        <Card.Title className="recipe-label">{item.label}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="recipe-calories">
                                <b>Calories:</b>
                                {' '}
                                {item.calories}
                                .
                            </ListGroup.Item>
                            <ListGroup.Item className="recipe-cookingtime">
                                <b>Cooking Time:</b>
                                {' '}
                                {item.cookingtime}
                                mins.
                            </ListGroup.Item>
                            <ListGroup.Item className="recipe-health-labels">
                                <b>Health Labels:</b>
                                {' '}
                                {item.healthLabels.slice(0, 5).map((healthLabel) => (
                                    <span className="recipe-health-label">{healthLabel}</span>
                                ))}
                            </ListGroup.Item>
                            <ListGroup.Item className="recipe-diet-labels">
                                <b>Diet Labels:</b>
                                {' '}
                                {item.dietLabels.slice(0, 5).map((dietLabel) => (
                                    <span className="recipe-diet-label">{dietLabel}</span>
                                ))}
                            </ListGroup.Item>
                            <ListGroup.Item className="recipe-cautions">
                                <b>Cautions:</b>
                                {' '}
                                {item.cautions.slice(0, 5).map((cautions) => (
                                    <span className="recipe-cautions">{cautions}</span>
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                        <Accordion>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div className="more-info">Ingredients</div>
                                </Accordion.Header>
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
                        <a href={item.url}>
                            <Button className="info-btn" variant="danger">Recipe Info</Button>
                        </a>
                    </Card.Body>
                </div>
            </Card>
        </Col>
    );
};

export default Meal;
