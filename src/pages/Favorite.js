import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

function Favorites(props) {
    const [recipeData, setRecipeData] = useState([])
    const [restaurantData, setRestaurantData] = useState([])
    
    user = User.query.filter_by(username=current_user.username).first()
    current_user_restaurants = user.restaurants
    current_user_restaurant_ids = []
    
    recipe_id = flask.request.json.get("recipe_ids")
    restaurant_id = flask.request.json.get("restaurant_ids")
    
    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/recipe_id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRecipeData(data.data)
        });

        fetch(`${process.env.PUBLIC_URL}/api/restaurant_id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "zip": null })
        }).then(response => response.json()).then(data => {
            console.log("data", data);
            setRestaurantData(data.data)
        });
    }, []);

return(
    <>
        <h1>Favorites<h1>
        
            const SearchBar = () => (
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search favorites</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search favorites"
                    name="s" 
                />
                <button type="submit">Search</button>
            </form>
        );

<row>
    <col>
        <card>
             <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        
        <card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
        </Card>
        
        <card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
        </Card>
        
    </col>
  </row>
        
export default Favorites
