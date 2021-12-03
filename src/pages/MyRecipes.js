import React, { useState, useEffect } from 'react';
import {
    Button, Card, Row, Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './MyRecipes.css';
import cookBook from '../assets/cookBook.png';

const MyRecipes = function () {
    const [isEmpty, setIsEmpty] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/get-my-recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((data) => {
            if (data.error === false) {
                setData(data.data);
                setIsEmpty(false);
            } else {
                setIsEmpty(true);
            }
        });
    }, [data, isEmpty]);

    const onClick = function (id) {
        console.log(`on click ${id}`);
        // alert('HIII ' + id)
    };

    const MyRecipe = function () {
        const recipes = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const content = (
                <Col className="recipe-col">
                    <Card onClick={() => onClick(item.id)} style={{ cursor: 'pointer' }} className="recipe-item">
                        <Card.Img variant="top" className="recipe-image" src={item.picture === null ? cookBook : `data:image/png;base64,${item.picture}`} />
                        <Card.Body>
                            <Card.Title className="recipe-label">{item.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            );
            recipes.push(content);
        }
        return (
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                {recipes.map((rec) => rec)}
            </Row>

        );
    };

    return (
        <div className="MyRecipes">
            <Row className="mt-2">
                <Col xs={10}><h1 className="ms-3">My Recipes</h1></Col>
                <Col xs={2} className="align-me">
                    <Button as={Link} to="/add-recipe" variant="outline-dark">
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                        Add Recipes
                    </Button>
                </Col>
            </Row>
            <div className={isEmpty ? null : 'hide'}>
                <div className="empty">
                    <img alt="empty box" src={cookBook} className="empty-img" />
                </div>
                <h4 className="call-action">Start adding create your own recipe</h4>
            </div>
            <MyRecipe />
        </div>

    );
};

export default MyRecipes;
