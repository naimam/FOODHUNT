import sadFace from '../assets/sad.png';
import surprisedFace from '../assets/surprised.png';
import './NoResult.css';

const NoResult = function (props) {
    const emoji = [sadFace, surprisedFace, surprisedFace];
    const title = ['No Result Found', 'Favorite Recipe is Empty', 'Favorite Restaurant is Empty'];
    const message = ["Sorry! We couldn't find what you're looking for. Please try another way.", 'We have nothing to show you here. Would you please go save some recipe then come back?', 'We have nothing to show you here. Would you please go save some restaurant then come back?'];

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
