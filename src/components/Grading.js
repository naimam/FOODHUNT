import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import './Grading.css';

function Grading(props) {
    //mode: "rating"  "pricing"
    //num: number of stars or dollar signs
    const num = props.num
    const mode = props.mode

    console.log("NUM " + num)

    const HalfStar = <div id="half-star" className="fa-layers">
        <FontAwesomeIcon icon={faStarHalf} className="fill" />
        <FontAwesomeIcon icon={faStarHalf} flip="horizontal" className="empty" />
    </div>

    const FullStar = <FontAwesomeIcon icon={faStar} className="fill" />
    const EmptyStar = <FontAwesomeIcon icon={faStar} className="empty" />
    const DollarSign = <FontAwesomeIcon icon={faDollarSign} className="dollar" />

    let Stars = Array.from(Array(5)).map((x, index) => {
        let s = num - (index + 1)
        if (s === .5) {
            return HalfStar
        } else if (s > 0) {
            return FullStar
        }
        else {
            return EmptyStar
        }
    })

    let Price = Array.from(Array(4)).map((x, index) => {
        if (num - index > 0) {
            return DollarSign
        }
    })


    return (
        <>
            {mode === "rating" ? Stars : Price}
        </>
    )
}

export default Grading