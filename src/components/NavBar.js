import { useState, useEffect } from 'react';
import './NavBar.css';
import {
    Nav, Navbar, NavDropdown, Button, Form, Modal, ToggleButton, ButtonGroup, InputGroup, Container,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faUser, faCog, faSignOutAlt, faAppleAlt, faPepperHot, faBook, faStar, faHome,
    faUserCircle, faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import restaurantIcon from '../assets/restaurantIcon.svg';
import recipeIcon from '../assets/recipeIcon.svg';
import pinIcon from '../assets/pinIcon.svg';

const NavBar = function (props) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        option: 'recipe',
        zip: null,
        restaurant_keyword: '',
        recipe_keyword: '',
    });
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const openSearch = () => {
        setShowModal(true);
    };
    const resetInput = () => {
        setInput({
            option: 'recipe',
            zip: props.zipcode,
            restaurant_keyword: '',
            recipe_keyword: '',
        });
        setErrors({});
    };
    const hideSearch = () => {
        resetInput();
        setShowModal(false);
    };

    const setField = (field, value) => {
        if (field === 'option') {
            resetInput();
        }
        setInput({
            ...input,
            [field]: value,
        });

        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            });
        }
    };

    const findFormErrors = () => {
        const {
            option, zip, restaurant_keyword, recipe_keyword,
        } = input;
        const newErrors = {};
        if (option === 'restaurant') {
            if (!restaurant_keyword || restaurant_keyword === '') newErrors.restaurant_keyword = 'cannot be blank!';
            if (!zip || zip === '' || !zipRegex.test(zip)) newErrors.zip = 'invalid zip code!';
        } else if (!recipe_keyword || recipe_keyword === '') newErrors.recipe_keyword = 'cannot be blank!';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (input.option === 'recipe') {
                navigate(`search/${input.option}/null/${input.recipe_keyword}`);
            } else {
                navigate(`search/${input.option}/${input.zip}/${input.restaurant_keyword}`);
            }
            hideSearch();
        }
    };

    const handleFocus = (event) => event.target.select();

    useEffect(() => { setField('zip', props.zipcode); }, [props.zipcode]);
    return (
        <>
            <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
                <Navbar.Brand as={Link} to="/home">
                    <img
                        alt="Logo"
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-center mx-2"
                    />
                    Food Hunt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            <FontAwesomeIcon icon={faHome} className="me-2" />
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/favorite">
                            <FontAwesomeIcon icon={faStar} className="me-2" />
                            Favorite
                        </Nav.Link>
                        <NavDropdown title={(
                            <>
                                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                                Meal Planner
                            </>
                        )}
                        >
                            <NavDropdown.Item as={Link} to="/meal-survey">
                                <FontAwesomeIcon icon={faPepperHot} className="me-2" />
                                Meal Survey
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/saved-meal-plan">
                                <FontAwesomeIcon icon={faAppleAlt} className="me-2" />
                                Meal Plan
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/my-recipes">
                            <FontAwesomeIcon icon={faBook} className="me-2" />
                            My Recipes
                        </Nav.Link>
                        <NavDropdown title={(
                            <>
                                <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                                Profile
                            </>
                        )}
                        >
                            <NavDropdown.Item>
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                Signed in as:
                                {props.username}
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/setting">
                                <FontAwesomeIcon icon={faCog} className="me-2" />
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href={`${process.env.PUBLIC_URL}/logout`}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                Log out
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                    <Form inline className="pe-md-3">
                        <Button id="search-btn" onClick={openSearch} variant="primary">
                            <FontAwesomeIcon icon={faSearch} />
                            {' '}
                            Search
                        </Button>
                    </Form>

                </Navbar.Collapse>
            </Navbar>

            <Modal
                show={showModal}
                onHide={hideSearch}
                size="xl"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <ButtonGroup size="lg">
                            <ToggleButton
                                key={0}
                                id="radio-recipe"
                                type="radio"
                                variant="outline-warning"
                                name="radio"
                                value="recipe"
                                checked={input.option === 'recipe'}
                                onChange={(e) => setField('option', e.target.value)}
                                className="btn-text"
                            >
                                Recipe
                            </ToggleButton>
                            <ToggleButton
                                key={1}
                                id="radio-restaurant"
                                type="radio"
                                variant="outline-warning"
                                name="radio"
                                value="restaurant"
                                checked={input.option === 'restaurant'}
                                onChange={(e) => setField('option', e.target.value)}
                                className="btn-text"
                            >
                                Restaurant
                            </ToggleButton>
                        </ButtonGroup>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className={input.option === 'restaurant' ? 'show' : 'hide'}>
                            <InputGroup className="w-50 mb-4 px-3">
                                <InputGroup.Text>
                                    <img
                                        alt="Icon"
                                        src={pinIcon}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-center me-2"
                                    />
                                    Zip code
                                </InputGroup.Text>
                                <Form.Control
                                    data-testid="zipcode-input"
                                    type="number"
                                    defaultValue={input.zip}
                                    placeholder="Enter your zip code here.."
                                    onChange={(e) => setField('zip', e.target.value)}
                                    onFocus={handleFocus}
                                    isInvalid={!!errors.zip}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-4  px-3">
                                <InputGroup.Text>
                                    <img
                                        alt="Icon"
                                        src={restaurantIcon}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-center me-2"
                                    />
                                    Restaurant
                                </InputGroup.Text>

                                <Form.Control
                                    data-testid="restaurant-input"
                                    type="text"
                                    placeholder="Search for restaurant, cuisine, or a dish"
                                    onChange={(e) => setField('restaurant_keyword', e.target.value)}
                                    isInvalid={!!errors.restaurant_keyword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.restaurant_keyword}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div className={input.option === 'recipe' ? 'show' : 'hide'}>
                            <InputGroup className="mb-4  px-3">
                                <InputGroup.Text>
                                    <img
                                        alt="Icon"
                                        src={recipeIcon}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-center me-2"
                                    />
                                    Recipe
                                </InputGroup.Text>

                                <Form.Control
                                    data-testid="recipe-input"
                                    type="text"
                                    placeholder="Find a recipe"
                                    onChange={(e) => setField('recipe_keyword', e.target.value)}
                                    isInvalid={!!errors.recipe_keyword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.recipe_keyword}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <Container className="w-100">
                            <Button className="float-end" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default NavBar;
