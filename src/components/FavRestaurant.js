import React from 'react';
import {
    Button, Card, Row, Col, ListGroup,
} from 'react-bootstrap';
import Grading from './Grading';
import './Restaurant.css';

const Restaurant = function (props) {
    const item = JSON.parse(props.restaurant);
    const wide = 7;

    function removeRestaurant(restaurant_id) {
        fetch(`${process.env.PUBLIC_URL}/api/remove-restaurant`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id }),
        }).then((response) => response.json()).then((data) => {
            if (!data.error) { /* if no error */
                props.remove();
            } else {
                // TODO show error message
            }
        });
    }

    const goToMore = (url) => {
        window.location.assign(url);
    };

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
                                        {item.state}
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
                                    <Grading mode="rating" num={item.rating} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price:
                                    <Grading mode="pricing" num={item.price.length} />
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Button onClick={() => goToMore(item.url)} variant="danger">More</Button>
                        <Button className="deleteBtn" variant="danger" onClick={() => removeRestaurant(item.id)}>Delete</Button>

                    </Card.Body>

                </div>
            </Card>
        </Col>
    );
};

export default Restaurant;
