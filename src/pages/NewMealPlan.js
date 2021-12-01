/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Row, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './MealPlan.css';
import Tabs, { Tab } from '../components/MealSurveyForm';
import Meal from '../components/Meal';


const NewMealPlan = function () {
    const saveBtn = {
        text: 'Save Meal Plan',
        disabled: false,
        variant: 'primary',
    };

    const savedBtn = {
        text: 'Meal Plan is Saved',
        disabled: true,
        variant: 'secondary',
    };

    const [mealNum, setMealNum] = useState([]);
    const [mealData, setMealData] = useState([]);
    const state = useLocation().state;
    const [button, setButton] = useState(saveBtn);

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
        e.preventDefault();
        fetch(`${process.env.PUBLIC_URL}/api/save-mealplan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meal_count: mealNum, meal_plan: mealData }),
        }).then((response) => response.json()).then((data) => {
            if (data.error === false) {
                setButton(savedBtn)
            }
        });

    }

    useEffect(() => {
        setMealData(state.data.data);
        setMealNum(state.data.num)
    }, [mealNum, mealData]);

    useEffect(() => {
        console.log(JSON.stringify(mealData))
        console.log(mealNum)
    }, [mealNum, mealData]);


    return (
        <div className="Plan">
            <MealTabs tabsData={mealData} tabsNum={mealNum} />
            <Form className="save-form" onSubmit={onSaveMealPlan}>
                <Form.Group className="mb-3">
                    <Form.Check required type="checkbox" label="By click save you will override previous saved meal plan" />
                </Form.Group>
                <Button type="submit" variant={button.variant} disabled={button.disabled}>
                    {button.text}
                </Button>
            </Form>
        </div>
    );



};

export default NewMealPlan;
