import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import NoResult from '../components/NoResult';
import Restaurant from '../components/Restaurant';
import { Button, Card, Row, Col, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap';
function Search() {
    const { option } = useParams();
    const { keyword } = useParams();
    const { zip } = useParams();

    const [data, setData] = useState([])
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        console.log('USE EFFECT', option, keyword)
        if (option === 'recipe') {
            console.log('recipe')
            fetch(`${process.env.PUBLIC_URL}/api/search-for-recipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "keyword": keyword })
            }).then(response => response.json()).then(data => {
                console.log("data", data);
                if (data.error === true) {
                    setHasError(true)
                } else {
                    setData(JSON.parse(data.data))
                }

            });
        } else {
            console.log('restaurant')
            fetch(`${process.env.PUBLIC_URL}/api/search-for-restaurant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "keyword": keyword, "zip": zip })
            }).then(response => response.json()).then(data => {
                console.log("data", data);
                if (data.error === true) {
                    setHasError(true)
                } else {
                    setData(JSON.parse(data.data))
                }
            });
        }
        //depedency
    }, [option, keyword, zip]);


    if (hasError === true) {
        return (<NoResult num={0} />)
    } else if (option === 'restaurant') {
        return <>
            <h1 className="page-title">{keyword} near {zip}</h1>
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">{data.map((restaurant, i) => {
                const arg = JSON.stringify(restaurant)
                return <Restaurant restaurant={arg} index={i} />
            })}</Row>
        </>

    } else if (option === 'recipe') {
        return <>
            <h1 className="page-title">{keyword} </h1>
            <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">{data.map((recipe, i) => {
                const arg = JSON.stringify(recipe)
                return <Recipe recipe={arg} index={i} />
            })}</Row>
        </>
    }
}

export default Search