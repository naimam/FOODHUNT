import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';
import NoResult from '../components/NoResult';
import Restaurant from '../components/Restaurant';

function Search() {
    const { option } = useParams();
    const { keyword } = useParams();
    const { zip } = useParams();

    const [data, setData] = useState([])
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
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
    }, [keyword, option]);


    if (hasError === true) {
        return (<NoResult />)
    } else if (option === 'restaurant') {
        // const display = data.map((item) => (
        //     <h1>{item.name}</h1>
        // ))
        return (<><Restaurant keyword={keyword} zip={zip} data={JSON.stringify(data)} /></>)

        // return (<p>{data[0].name}</p>)
    } else if (option === 'recipe') {
        //TODO add recipe component
        return <> <Recipe keyword={keyword} data={JSON.stringify(data)} /></>
    }
}

export default Search