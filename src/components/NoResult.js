import './NoResult.css';
import { Link } from 'react-router-dom';
import sadFace from '../assets/sad.png';
import sadPage from '../assets/sadPage.png';
import surprisedFace from '../assets/surprised.png';
import embarrassedFace from '../assets/embarrassed.png';

const NoResult = function (props) {
    const emoji = [sadFace, surprisedFace, surprisedFace, embarrassedFace];
    const title = ['No Result Found', 'Favorite Recipe is Empty', 'Favorite Restaurant is Empty', 'There is No Saved Meal Plan'];
    const message = [
        "Sorry! We couldn't find what you're looking for. Please try another way.",
        'We have nothing to show you here. Would you please go save some recipe then come back?',
        'We have nothing to show you here. Would you please go save some restaurant then come back?',
        <>
            Go take the
            {' '}
            <Link id="link" to="/meal-survey">meal survey</Link>
        </>];

    if (props.num === 4) {
        return (
            <div id="parent">
                <img
                    id="sad-face"
                    alt="sad face"
                    src={sadPage}
                />
                <h1 id="big-title">
                    404
                </h1>
                <h2 id="title">
                    Ooooops! You were not supposed to see this!
                </h2>
                <p id="message">
                    Return to the
                    {' '}
                    <Link id="link" to="/home">homepage</Link>
                    {' '}
                    and remember: you have not seen anything!
                </p>
            </div>
        );
    }

    return (
        <div id="parent">
            <img
                id="sad-face"
                alt="sad face"
                src={emoji[props.num]}
            />
            <h2 id="title">
                {title[props.num]}
            </h2>
            <p id="message">
                {message[props.num]}
            </p>
        </div>
    );
};

export default NoResult;
