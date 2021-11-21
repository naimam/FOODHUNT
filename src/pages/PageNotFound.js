import React from 'react';
import { Link } from 'react-router-dom';
import sadFace from '../assets/sadPage.png';

const PageNotFound = function () {
    return (
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
                Ooooops! You were not supposed to see this!
            </h2>
            <p id="message">
                Return to the
                <Link id="link" to="/home">homepage</Link>
                and remember: you have not seen anything!
            </p>
        </div>
    );
};

export default PageNotFound;
