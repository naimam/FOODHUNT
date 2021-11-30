/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './MealPlan.css';
import Tabs, { Tab } from '../components/MealSurveyForm';
import Meal from '../components/Meal';


const MealPlan = function () {
    const [mealNum, setMealNum] = useState([]);
    const [mealData, setMealData] = useState([]);
    const state = useLocation().state;

    const MealTabs = (props) => {
        const tabs = [];
        for (let i = 0; i < mealNum; i++) {
            const contentArr = [];
            for (const mealType in mealData) {
                const content = mealData[mealType][i];
                if (content) {
                    contentArr.push({ label: mealType, content: content });
                }
            }
            const content = <Tab heading={`Day ${i + 1}`} key={`Tab__${i}`}>
                <Row xs={1} sm={2} md={3} xl={4} xxl={5} className="g-4 restaurant-row m-2">
                    {
                        contentArr.map((plan, i) => {
                            const recipe = plan.content;
                            return (

                                <Meal mealRecipe={recipe} mealLabel={plan.label} />
                            );
                        })
                    }
                </Row>
            </Tab>

            tabs.push(content)
        }
        return (
            <Tabs defaultIndex={0} className="Plan__tabs" >{tabs.map((tab) => tab)}</Tabs>
        )
    };

    useEffect(() => {
        setMealData(state.data.data);
        setMealNum(state.data.num)
    }, [mealNum, mealData]);

    return (
        <div className="Plan">
            <MealTabs tabsData={mealData} tabsNum={mealNum} />
            <Button>Save</Button>
        </div>
    );
};

export default MealPlan;
