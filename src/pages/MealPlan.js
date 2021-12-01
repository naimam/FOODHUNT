/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Row, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './MealPlan.css';
import Tabs, { Tab } from '../components/MealSurveyForm';
import Meal from '../components/Meal';


const MealPlan = function () {
    const [mealNum, setMealNum] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [from, setFrom] = useState('navbar');
    const state = useLocation().state;

    const MealTabs = function () {
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

    const onSaveMealPlan = function (e) {
        alert('it works!');
        e.preventDefault();
    }

    useEffect(() => {
        setMealData(state.data.data);
        setMealNum(state.data.num)
        setFrom(state.data.from)
    }, [mealNum, mealData, from]);

    if (from === 'navbar') {
        return (<div className="Plan">
            <h1>Nav Bar</h1>
            <Form className="save-form" onSubmit={onSaveMealPlan}>
                <Form.Group className="mb-3">
                    <Form.Check required type="checkbox" label="By click save you will override previous saved meal plan" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Meal Plan
                </Button>
            </Form>
        </div>)
    } else {
        return (
            <div className="Plan">
                <MealTabs tabsData={mealData} tabsNum={mealNum} />
                <Form className="save-form">
                    <Form.Group className="mb-3">
                        <Form.Check required type="checkbox" label="By click save you will override previous saved meal plan" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Meal Plan
                    </Button>
                </Form>
            </div>
        );
    }


};

export default MealPlan;
