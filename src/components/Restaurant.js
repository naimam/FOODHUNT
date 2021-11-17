import React, { useState, useEffect } from 'react';

import {
    Button, Card, Row, Col, ListGroup,
} from 'react-bootstrap';
import Grading from './Grading';
import './Restaurant.css';

const Restaurant = function (props) {
    const item = JSON.parse(props.restaurant);
    const wide = 7;

    const saveBtn = {
        text: 'Save',
        buttonClass: 'save-button',
        disabled: false,
        action: 'save',
        variant: 'success',
    };

    const savedBtn = {
        text: 'Saved',
        buttonClass: 'saved-button',
        disabled: true,
        action: 'save',
        variant: 'secondary',

    };
    const [button, setButton] = useState(saveBtn);

    const saveRestaurant = (id) => {
        fetch(`${process.env.PUBLIC_URL}/api/save-restaurant`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id: id }),
        }).then((response) => response.json()).then((data) => {
            if (!data.error) { /* if no error */
                setButton(savedBtn);
            } else {
                // TODO show error message
            }
        });
    };

    const goToMore = (url) => {
        window.location.assign(url);
    };

    useEffect(() => {
        item.already_saved === true ? setButton(savedBtn) : setButton(saveBtn);
    }, []);

    return (
        <Col>
            <Card>
                <div>
                    <Card.Img variant="top" className="restaurant-image" src={item.image_url} alt={item.name} />
                    <Card.Body>
                        <Card.Title className="restaurant-name">
                            {item.name}
                        </Card.Title>
                        <Card.Text>
                            <Row>
                                <Col>Address:</Col>
                                <Col xs={wide}>
                                    <Row>{item.address}</Row>
                                    <Row>
                                        {item.city}
                                        ,
                                        {' '}
                                        {item.state}
                                        {' '}
                                        {item.zip_code}
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>Phone:</Col>
                                <Col xs={wide}>{item.phone}</Col>
                            </Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item />
                                <ListGroup.Item>
                                    Rating:
                                    {' '}
                                    <Grading mode="rating" num={item.rating} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price:
                                    {' '}
                                    <Grading mode="pricing" num={item.price.length} />
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Button onClick={() => goToMore(item.url)} variant="danger">More</Button>
                        <Button
                            className={button.buttonClass}
                            variant={button.variant}
                            disabled={button.disabled}
                            onClick={() => saveRestaurant(item.id)}
                        >
                            {button.text}
                        </Button>
                    </Card.Body>

                </div>
            </Card>
        </Col>
    );
};

export default Restaurant;
