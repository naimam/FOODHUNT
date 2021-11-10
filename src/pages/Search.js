import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Search() {
    const { option } = useParams();
    const { keyword } = useParams();
    const { zip } = useParams();

    const [data, setData] = useState([])

    useEffect(() => {
        if (option === 'recipe') {
            console.log('recipe')
            fetch(`${process.env.PUBLIC_URL}/api/search-for-recipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "keyword": keyword })
            }).then(response => response.json()).then(data => {
                console.log(data)
                setData(data.data)
            });
        } else {
            fetch(`${process.env.PUBLIC_URL}/api/search-for-restaurant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "keyword": keyword, "zip": zip })
            }).then(response => response.json()).then(data => {
                console.log(data)
                setData(data.data)
            });
        }
        //depedency
    }, [keyword, option]);

    return (<>
        <h1>Search Result Page !!</h1>
        <h2>Option: {option}</h2>
        <h2>Keyword: {keyword}</h2>
        <h2>Zip code: {zip}</h2>
        <p>
            {data}
        </p>
    </>)
}

export default Search