import { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import FavRecipe from '../components/FavRecipe';
import NoResult from '../components/NoResult';
import FavRestaurant from '../components/FavRestaurant';
import { Button, Card, Row, Col, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'recipe',
            recipes: [],
            restaurants: [],
            hasError: false,


        }
    }

    componentDidMount() {
        this.setState({ option: this.props.option })
        if (this.state.option === 'recipe') {
            console.log('recipe')
            fetch(`${process.env.PUBLIC_URL}/api/favorite-recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => response.json()).then(data => {
                console.log("recipe data", data);
                if (data.error === true) {
                    this.setState({ hasError: true })
                } else {
                    this.setState({ recipes: data.data })
                    console.log("this state recipe", this.state.recipes)
                }

            });
        } else {
            console.log('restaurant')
            fetch(`${process.env.PUBLIC_URL}/api/favorite-restaurants`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => response.json()).then(data => {
                console.log("data", data);
                if (data.error === true) {
                    this.setState({ hasError: true })
                } else {
                    this.setState({ restaurants: data })
                }

            });
        }

    }

    removeRecipe(index) {
        const newArray = [...this.state.recipes];
        newArray.splice(index, 1);
        this.setState({ recipes: newArray });

    }

    render() {
        console.log("this state", this.state.recipes)
        if (this.state.hasError === true) {
            return (<NoResult />)
        } else if (this.state.option === 'recipe') {

            return <>
                <h1 className="page-title">Favorite Recipes</h1>
                <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">{this.state.recipes && (this.state.recipes).map((recipe, i) => {
                    return <FavRecipe recipe={recipe} index={i} remove={() => this.removeRecipe(i)} />
                })}</Row>

            </>

        } else if (this.state.option === 'restaurant') {
            return <>
                <h1 className="page-title">Favorite Restaurants</h1>
                <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">{this.state.restaurants.map((restaurant, i) => {
                    const arg = JSON.stringify(restaurant)
                    return <FavRestaurant restaurant={arg} index={i} />
                })}</Row>
            </>

        }
    }
}

export default Favorite