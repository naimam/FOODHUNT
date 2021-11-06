import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default class NavBar extends React.Component {
    render() {
        return (<>
            <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
                <Navbar.Brand as={Link} to="/home">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-center"
                    />{' '}
                    Food Hunt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/favorite">Favorite</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>)
    }
}