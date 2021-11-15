import { useState, useEffect } from 'react';
import { Card, Row, Col, Carousel, Container, Button, ListGroup } from 'react-bootstrap';
import Grading from '../components/Grading';


function Home(props) {
    const wide = 7
    const [recipeData, setRecipeData] = useState([])
    const [restaurantData, setRestaurantData] = useState([])
    const resCarousel = [[], [], []]
    const recCarousel = [[], [], []]

    const goToMore = (url) => {
        window.location.assign(url);
    };

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/recommended-recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRecipeData(data.data)
        });

        fetch(`${process.env.PUBLIC_URL}/api/recommended-restaurants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "zip": null })
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRestaurantData(data.data)
        });
    }, []);

    restaurantData.map((restaurant, i) => {
        resCarousel[i % 3].push(
            <Col>
                <Card>
                    <Card.Img variant="top" className="restaurant-image" src={restaurant.image_url} alt={restaurant.name} />
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                            <Row>
                                <Col>Address:</Col>
                                <Col xs={wide}><Row>{restaurant.address}</Row> <Row>{restaurant.city}, {restaurant.state} {restaurant.zip_code} </Row></Col>
                            </Row>
                            <Row>
                                <Col>Phone:</Col>
                                <Col xs={wide}>{restaurant.phone}</Col>
                            </Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item />
                                <ListGroup.Item>Rating: <Grading mode="rating" num={restaurant.rating} /> </ListGroup.Item>
                                <ListGroup.Item>Price: <Grading mode="pricing" num={restaurant.price.length} /></ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Button onClick={() => goToMore(restaurant.url)} variant="danger">More</Button>

                    </Card.Body>
                </Card>
            </Col>
        )
    })

    recipeData.map((recipe, i) => {
        recCarousel[i % 3].push(
            <Col>
                <Card>
                    <Card.Img variant="top" className="recipe-image" src={recipe.image} alt={recipe.label} />
                    <Card.Body>
                        <Card.Title>{recipe.label}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="recipe-calories"><b>Calories:</b> {recipe.calories}. </ListGroup.Item>
                            <ListGroup.Item className="recipe-cookingtime"><b>Cooking Time:</b> {recipe.cookingtime} mins.</ListGroup.Item>
                            <ListGroup.Item className="recipe-health-labels"><b>Health Labels:</b>  {recipe.healthLabels.slice(0, 5).map((healthLabel) => (
                                <span className="recipe-health-label">{healthLabel}</span>
                            ))}
                            </ListGroup.Item>
                        </ListGroup>
                        <a href={recipe.url}> <Button className="info-btn" variant="danger">Recipe Info</Button></a>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <>
            <Container>
                <h1 className="mt-4 mb-3">Recommended Restaurants</h1>

                <Carousel variant="dark" className="m-3">
                    <Carousel.Item>
                        <Row >
                            {resCarousel[0]}
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            {resCarousel[1]}
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            {resCarousel[2]}
                        </Row>
                    </Carousel.Item>
                </Carousel>

                <h1 className="mt-5">Selected Recipes</h1>

                <Carousel variant="dark" className="m-3">
                    <Carousel.Item>
                        <Row >
                            {recCarousel[0]}
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            {recCarousel[1]}
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            {recCarousel[2]}
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </Container>

        </>
    )
}

export default Home