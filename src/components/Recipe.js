import React, { useState, useEffect } from 'react';
import {
    Button, Card, Col, Accordion, ListGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './Recipe.css';

const Recipe = function (props) {
    const item = JSON.parse(props.recipe);
    const saveBtn = {
        text: 'Save',
        buttonClass: 'save-button',
        disabled: false,
        action: 'save',
        variant: 'success',
        icon: <FontAwesomeIcon icon={faSave} />,
    };

    const savedBtn = {
        text: 'Saved',
        buttonClass: 'saved-button',
        disabled: true,
        action: 'save',
        variant: 'secondary',
        icon: <FontAwesomeIcon icon={faSave} />,
    };

    const [button, setButton] = useState(saveBtn);

    function saveRecipe(id) {
        fetch(`${process.env.PUBLIC_URL}/api/save-recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: id }),
        }).then((response) => response.json()).then((data) => {
            if (!data.error) { /* if no error */
                setButton(savedBtn);
            } else {
                // TODO show error message
            }
        });
    }

    useEffect(() => {
        item.already_saved === true ? setButton(savedBtn) : setButton(saveBtn);
    }, []);

    return (
        <Col className="recipe-col">
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
                        <Button
                            className={button.buttonClass}
                            variant={button.variant}
                            disabled={button.disabled}
                            onClick={() => saveRecipe(item.recipe_id)}
                        >
                            {button.text}
                            {button.icon}
                        </Button>

                    </Card.Body>
                </div>
            </Card>
        </Col>
    );
};

export default Recipe;
