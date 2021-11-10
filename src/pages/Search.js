import React from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../components/Recipe';

function Search() {
    const { option } = useParams();
    const { keyword } = useParams();
    const { zip } = useParams();

    if (option === 'recipe') {
        return (
            <Recipe keyword={keyword} />
        );
    }
    return (<>
        <h1>Search Result Page !!</h1>
        <h2>Option: {option}</h2>
        <h2>Keyword: {keyword}</h2>
        <h2>Zip code: {zip}</h2>
    </>)
}

export default Search