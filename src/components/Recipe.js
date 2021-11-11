import React from 'react';
import { Button, Card, Row, Col, Accordion } from 'react-bootstrap';
import './Recipe.css';

function Recipe(props) {
    var results = JSON.parse(props.data);
    const display = results.map((item) => {
        return <Col className="recipe-col" >
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

    })



    return (
        <>
            <h1 className="page-title">{props.keyword} </h1>
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 recipe-row">{display}</Row>
        </>
    );
}


export default Recipe;