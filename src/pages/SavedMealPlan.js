/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import './MealPlan.css';
import Tabs, { Tab } from '../components/MealSurveyForm';
import Meal from '../components/Meal';
import NoResult from '../components/NoResult';

const SavedMealPlan = function () {
    const [mealNum, setMealNum] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const MealTabs = function () {
        const tabs = [];
        for (let i = 0; i < mealNum; i++) {
            const contentArr = [];
            for (const mealType in mealData) {
                const content = mealData[mealType][i];
                if (content) {
                    contentArr.push({ label: mealType, content });
                }
            }
            const content = (
                <Tab heading={`Day ${i + 1}`} key={`Tab__${i}`}>
                    <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                        {
                            contentArr.map((plan) => {
                                const recipe = plan.content;
                                return (
                                    <Meal mealRecipe={recipe} mealLabel={plan.label} />
                                );
                            })
                        }
                    </Row>
                </Tab>
            );

            tabs.push(content);
        }
        return (
            <Tabs defaultIndex={0} className="Plan__tabs">{tabs.map((tab) => tab)}</Tabs>
        );
    };

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/api/fetch-mealplan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meal_count: mealNum, meal_plan: mealData }),
        }).then((response) => response.json()).then((data) => {
            if (data.error === false) {
                setMealNum(data.data.meal_count);
                setMealData(data.data.meal_plan);
                setIsEmpty(false);
            } else {
                setIsEmpty(true);
            }
        });
    }, [mealNum, mealData, isEmpty]);

    return (
        <div className="Plan">
            {isEmpty ? <NoResult num={3} /> : (
                <>
                    <h1 className="page-title">Your Saved Meal Plan</h1>
                    <MealTabs tabsData={mealData} tabsNum={mealNum} />
                    {' '}
                </>
            )}
        </div>
    );
};

export default SavedMealPlan;
