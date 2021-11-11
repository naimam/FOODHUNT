import React from 'react';
import { useState } from 'react';
import { Button, Card, Row, Col, Accordion, ListGroup } from 'react-bootstrap';
import './Restaurant.css';

function Restaurant(props) {
    const wide = 7
    var results = JSON.parse(props.data);
    const display = results.map((item) => {
        console.log(item.image_url)
        return <Col>
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
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Rating: {item.rating}</ListGroup.Item>
                        <ListGroup.Item>Price: {item.price}</ListGroup.Item>
                    </ListGroup>
                </div>
            </Card>
        </Col>
    })


    const goToMore = (url) => {
        window.location.assign(url);
    };

    return (
        <>
            <h1 className="page-title">{props.keyword} near {props.zip}</h1>
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">{display}</Row>
        </>
    )
}

export default Restaurant