import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
                console.log(data)
                if (data.error == true) {
                    setHasError(true)
                } else {
                    setData(data.data)
                }

            });
        } else {
            fetch(`${process.env.PUBLIC_URL}/api/search-for-restaurant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "keyword": keyword, "zip": zip })
            }).then(response => response.json()).then(data => {
                console.log(data)
                if (data.error == true) {
                    setHasError(true)
                } else {
                    setData(data.data)
                }
            });
        }
        //depedency
    }, [keyword, option]);

    if (hasError == true) {
        return (
            <NoResult />
        )
    } else if (option == 'restaurant') {
        return (<><Restaurant data={data} /></>)
    } else if (option == 'recipe') {
        return <> Recipe Component</>
    }
}

export default Search