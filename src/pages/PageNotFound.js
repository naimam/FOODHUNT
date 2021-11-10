import React from 'react';
import sadFace from '../assets/sadPage.png'
import { Link } from 'react-router-dom';


class PageNotFound extends React.Component {
    render() {
        return (<>
            <div id="parent">
                <img
                    id="sad-face"
                    alt="sad face"
                    src={sadFace}
                />
                <h1 id="big-title">
                    404
                </h1>
                <h2 id="title">
                    Ooooops! You weren't supposed to see this
                </h2>
                <p id="message">
                    Return to the <Link id="link" to="/home">homepage</Link> and remember: you haven't see anything
                </p>
            </div>
        </>)
    }
}

export default PageNotFound