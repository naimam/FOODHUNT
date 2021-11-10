import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoResult from '../components/NoResult';
import Restaurant from '../components/Restaurant';

function Search() {
    const test =
        [
            {
                "userId": 1,
                "id": 1,
                "title": " How to Shape of Character Design",
                "write": "Jun Bale",
                "date": "20/12/20",
                "time": "10:00AM",
                "body": " Because he takes  nsuscipit accepted result lightly with  nreprehenderit discomfort may be the entire  nnostrum of the things that happens is that they are extremely ",
                "image": "https://source.unsplash.com/rDEOVtE7vOs/1600x900",
                "tag": ["good", "great", "javascript", "wife"]
            },
            {
                "userId": 1,
                "id": 2,
                "write": "Henry Cavil",
                "date": "21/12/20",
                "time": "08:00AM",
                "title": " How to Write About Your Life? Start Here .",
                "body": " it is the time of  nseq are not criticize consumer happy that the pain or  nfugiat soothing pleasure forward or no discomfort may rejecting some  nWho, not being due, we may be able to open the man who did not, but there is no ",
                "image": "https://source.unsplash.com/WNoLnJo7tS8/1600x900",
                "tag": ["happy", "USA", "no", "wife"]
            },
            {
                "userId": 1,
                "id": 3,
                "write": "Katrina Taylor",
                "date": "24/12/20",
                "time": "06:49PM",
                "title": " How to Survive as a Freelancer in 2020 ",
                "body": " innocent, but the law  nvoluptatis blinded the election or the  nvoluptatis pains or prosecutors who is to pay nmolestiae and is willing to further or to and from the toil of an odious term ",
                "image": "https://source.unsplash.com/vMV6r4VRhJ8/1600x900",
                "tag": ["indian", "babbyes", "java", "hate"]
            },
            {
                "userId": 1,
                "id": 4,
                "write": "Christian",
                "date": "26/12/20",
                "time": "09:00PM",
                "title": " Need help with your dating profile?",
                "body": " any and often rejecting a pleasure to get  mānsit film will take to provide the fault  nquir is advantageous not know how the bound and pain the law  nFor the pleasure of the outdoor ",
                "image": "https://source.unsplash.com/mEZ3PoFGs_k/1600x900",
                "tag": ["babby", "no", "viw", "wife"]
            },
            {
                "userId": 1,
                "id": 5,
                "title": " Little Steps You Can Take to Become a Better Writer ",
                "write": "Robert Downey",
                "date": "28/12/20",
                "time": "05:00AM",
                "image": "https://source.unsplash.com/6W4F62sN_yI/1600x900",
                "body": "The 9 worst computer support specialists in history. 18 secrets about latest electronic gadgets the government is hiding. What experts are saying about wholesale accessories",
                "tag": ["love", "fake", "react", "work"]
            }
        ];

    // console.log(test.length)
    // console.log(test)
    // test.map((x) => {
    //     console.log(x.write)
    // })
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
                if (data.error === true) {
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
        return <> Recipe Component</>
    }
}

export default Search