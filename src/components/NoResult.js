import React from 'react';
import sadFace from '../assets/sad.png'
import './NoResult.css';

function NoResult() {

    return (
        <div id="parent">
            <img
                id="sad-face"
                alt="sad face"
                src={sadFace}
            />
            <h2 id="title">
                No Result Found
            </h2>
            <p id="message">
                Sorry! We couldn't find what you're looking for. Please try another way.
            </p>
        </div>
    )
}

export default NoResult