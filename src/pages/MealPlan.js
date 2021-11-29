import React from 'react';
import { useLocation } from 'react-router-dom';
import './MealPlan.css';

const MealPlan = function () {
    // if (!props.location || !props.location.state || !props.location.state.data) {
    //     return (
    //         <div>
    //             Not Found
    //         </div>
    //     );
    // }
    const { state } = useLocation();
    console.log(state.data);
    return (
        <div>
            <h1>Meal Planner Page!</h1>
            <h2>hey</h2>
        </div>
    );
};

export default MealPlan;
