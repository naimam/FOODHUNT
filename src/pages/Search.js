import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Row,
} from 'react-bootstrap';
import Recipe from '../components/Recipe';
import NoResult from '../components/NoResult';
import Restaurant from '../components/Restaurant';

const Search = function () {
    const { option } = useParams();
    const { keyword } = useParams();
    const { zip } = useParams();

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (option === 'recipe') {
            fetch(`${process.env.PUBLIC_URL}/api/search-for-recipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword }),
            }).then((response) => response.json()).then((rec) => {
                if (rec.error === true) {
                    setHasError(true);
                } else {
                    setData(JSON.parse(rec.data));
                }
            });
        } else {
            fetch(`${process.env.PUBLIC_URL}/api/search-for-restaurant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword, zip }),
            }).then((response) => response.json()).then((res) => {
                if (res.error === true) {
                    setHasError(true);
                } else {
                    setData(JSON.parse(res.data));
                }
            });
        }
        // depedency
    }, [option, keyword, zip]);

    if (hasError === true) {
        return (<NoResult num={0} />);
    } if (option === 'restaurant') {
        return (
            <>
                <h1 className="page-title">
                    {keyword}
                    {' '}
                    near
                    {' '}
                    {zip}
                </h1>
                <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                    {data.map((restaurant, i) => {
                        const arg = JSON.stringify(restaurant);
                        return <Restaurant restaurant={arg} index={i} />;
                    })}
                </Row>
            </>
        );
    } if (option === 'recipe') {
        return (
            <>
                <h1 className="page-title">
                    {keyword}
                </h1>
                <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                    {data.map((recipe, i) => {
                        const arg = JSON.stringify(recipe);
                        return <Recipe recipe={arg} index={i} />;
                    })}
                </Row>
            </>
        );
    }
    return null;
};

export default Search;
