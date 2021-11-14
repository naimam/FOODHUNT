import React from 'react';
import { useState } from 'react';
import { Button, Card, Row, Col, Accordion, ListGroup } from 'react-bootstrap';
import './Restaurant.css';

function Restaurant(props) {
    const saveBtn = {
        text: "Save",
        buttonClass: "save-button",
        disabled: false,
        action: "save",
        variant: "success",
    }


    const savedBtn = {
        text: "Saved",
        buttonClass: "saved-button",
        disabled: true,
        action: "save",
        variant: "secondary",

    };
    const [button, setButton] = useState(saveBtn);
    const wide = 7
    const saveRestaurant = (id) => {
        alert(id)
        setButton(savedBtn)
    }


    const goToMore = (url) => {
        window.location.assign(url);
    };

    var item = JSON.parse(props.restaurant);


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
                                <Col xs={wide}><Row>{item.address}</Row> <Row>{item.city}, {item.state} {item.zip_code} </Row></Col>
                            </Row>
                            <Row>
                                <Col>Phone:</Col>
                                <Col xs={wide}>{item.phone}</Col>
                            </Row>
                        </Card.Text>
                        <Button onClick={() => goToMore(item.url)} variant="danger">More</Button>
                        <Button onClick={() => saveRestaurant(item.id)} variant="success">{button.text}</Button>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Rating: {item.rating}</ListGroup.Item>
                        <ListGroup.Item>Price: {item.price}</ListGroup.Item>
                    </ListGroup>
                </div>
            </Card>
        </Col >
    )
}

export default Restaurant