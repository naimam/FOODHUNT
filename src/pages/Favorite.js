/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-len */
import { Component } from 'react';
import './Favorite.css';
import { Button, Row } from 'react-bootstrap';
import FavRecipe from '../components/FavRecipe';
import NoResult from '../components/NoResult';
import FavRestaurant from '../components/FavRestaurant';

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'recipe',
            recipes: [],
            restaurants: [],
            resIsEmpty: false,
            recIsEmpty: false,
        };
    }

    componentDidMount() {
        this.setState({ option: this.props.option });

        fetch(`${process.env.PUBLIC_URL}/api/favorite-recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((data) => {
            if (data.error === true) {
                this.setState({ recIsEmpty: true });
            } else {
                this.setState({ recipes: data.data });
            }
        });

        fetch(`${process.env.PUBLIC_URL}/api/favorite-restaurants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json()).then((data) => {
            if (data.error === true) {
                this.setState({ resIsEmpty: true });
            } else {
                this.setState({ restaurants: data.data });
            }
        });
    }

    removeRecipe(index) {
        const newArray = [...this.state.recipes];
        newArray.splice(index, 1);
        this.setState({ recipes: newArray });
        if (this.state.recipes.length === 0) {
            this.setState({ recIsEmpty: true });
        }
    }

    removeRestaurant(index) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const newArray = [...this.state.restaurants];
        newArray.splice(index, 1);
        this.setState({ restaurants: newArray });
        if (this.state.restaurants.length === 0) {
            this.setState({ resIsEmpty: true });
        }
    }

    render() {
        if (this.state.option === 'recipe') {
            if (this.state.recIsEmpty === true) {
                return (
                    <>
                        <NoResult num={1} />
                        <Button className="switch-btn" id="res-btn" size="lg" onClick={() => { this.setState({ option: 'restaurant' }); }}>Restaurant</Button>
                    </>
                );
            }
            return (
                <>
                    <h1 className="page-title">Favorite Recipes</h1>
                    <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                        {this.state.recipes && (this.state.recipes).map((recipe, i) => <FavRecipe recipe={recipe} remove={() => this.removeRecipe(i)} />)}
                    </Row>
                    <Button className="switch-btn" id="res-btn" size="lg" onClick={() => { this.setState({ option: 'restaurant' }); }}>Restaurant</Button>
                </>
            );
        } if (this.state.option === 'restaurant') {
            if (this.state.resIsEmpty === true) {
                return (
                    <>
                        <NoResult num={2} />
                        <Button className="switch-btn" id="rec-btn" size="lg" onClick={() => { this.setState({ option: 'recipe' }); }}>Recipe</Button>
                    </>
                );
            }
            return (
                <>
                    <h1 className="page-title">Favorite Restaurants</h1>
                    <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                        {this.state.restaurants && (this.state.restaurants).map((restaurant, i) => <FavRestaurant restaurant={restaurant} remove={() => this.removeRestaurant(i)} />)}
                    </Row>
                    <Button className="switch-btn" id="rec-btn" size="lg" onClick={() => { this.setState({ option: 'recipe' }); }}>Recipe</Button>
                </>
            );
        }
        return null;
    }
}

export default Favorite;
