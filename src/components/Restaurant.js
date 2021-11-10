import React from 'react';
import { useState } from 'react';
import { Button, Card, Row, Col, Accordion } from 'react-bootstrap';
import './Restaurant.css';

function Restaurant(props) {

    return (
        <>
            <h1>Restaurant</h1>
            <p>{props.data}</p>
        </>
    )
}

export default Restaurant