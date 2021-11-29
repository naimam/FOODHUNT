/* eslint-disable */
import { Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import './MealSurvey.css';
import Tabs, { Tab, Button, Radio, RadioGroup, Select, CheckboxGroup } from '../components/MealSurveyForm'
import logo from '../logo.png';
class MealSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "selectOpt": {
                    "mealCount": [{ "val": 2, "text": "Two" }, { "val": 3, "text": "Three" }, { "val": 5, "text": "Five" }],
                    "planType": [{ "val": 1, "text": "Daily" }, { "val": 7, "text": "Weekly" }]
                },
                "dietSpec": [
                    { "name": "balanced", "text": "Balanced Diet (Recommended)" },
                    { "name": "low-carb", "text": "Low-Carb (Less than 20% of total calories from carbs)" },
                    { "name": "low-fat", "text": "Low-Fat (Less than 15% of total calories from fat)" }],
                "healthSpec": [
                    { "name": "vegan", "text": "Vegan (No meat, poultry, fish, dairy, eggs or honey)" },
                    { "name": "vegetarian", "text": "Vegetarian (No wheat, can have gluten though)" },
                    { "name": "alcohol-free", "text": "Alcohol-free (No alcohol used or contained)" },
                    { "name": "peanut-free", "text": "Peanut Free (No peanuts or products containing peanuts)" }],
                "mealTypes": {
                    "2": ["Brunch", "Dinner"],
                    "3": ["Breakfast", "Lunch", "Dinner"],
                    "5": ["Breakfast Snack", "Breakfast", "Lunch", "Afternoon Snack", "Dinner"]
                },
                "calories": { "min": 1800, "max": 2500 }
            },
            mealCount: 2,
            planType: 1,
            healthPreferences: {},
            calories: {
                activeIndex: 0,
                selected: 'rec',
                min: 1800,
                max: 2500,
            },
            diet: {
                activeIndex: 0,
                name: "balanced",
            },
            loading: false,
            redirect: false,
        };

        this.tabs = React.createRef();

        this.goTo = this.goTo.bind(this);
        this.handleDiet = this.handleDiet.bind(this);
        this.setCalories = this.setCalories.bind(this);
        this.getMealPlan = this.getMealPlan.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleHealth = this.handleHealth.bind(this);
        this.handleCalories = this.handleCalories.bind(this);

    }

    handleHealth(name) {
        this.setState((prevState) => {
            const value = prevState.healthPreferences[name] ? !prevState.healthPreferences[name] : true;
            return { healthPreferences: { ...prevState.healthPreferences, [name]: value } };
        });
    }

    handleSelect(e) {
        const { target } = e;
        this.setState({ [target.name]: parseInt(target.value, 10) });
    }

    handleCalories(index) {
        const selected = (parseInt(index, 10) === 1) ? 'custom' : 'rec';
        this.setState({
            calories: { ...this.state.calories, activeIndex: index, selected },
        });
    }

    setCalories(e) {
        const { target } = e;
        if (target.value) {
            let value = parseInt(target.value, 10);
            if (isNaN(value)) {
                value = 0;
            }
            this.setState({ calories: { ...this.state.calories, [target.name]: value } });
        }
    }

    handleDiet(index) {
        const { name } = this.state.data.dietSpec[index];
        this.setState({
            diet: { activeIndex: index, name },
        });
    }

    goTo(e) {
        e.preventDefault();
        const Tabs = this.tabs.current;
        switch (e.target.name) {
            case 'next':
                Tabs.handleClick(Tabs.state.activeIndex + 1);
                break;
            case 'back':
                Tabs.handleClick(Tabs.state.activeIndex - 1);
                break;
            default:
                break;
        }
    }

    getMealPlan(e) {
        e.preventDefault();
        const { mealCount, planType, healthPreferences, calories, diet } = this.state;
        const meals = this.state.data.mealTypes[mealCount];
        const input = {
            plan_type: planType,
            health: healthPreferences,
            calories: { min: calories.min, max: calories.max },
            diet: diet.name,
            meals: meals,
        }

        this.setState({ loading: true }, () => {
            //   getPlan(res).then(
            //     (data) => {
            //       let par = {num:this.state.planType,data: data}
            //       //stop loading and redirect to meal page
            //       this.setState({loading:false, redirect: true, data: par});
            //     }
            //  );

            fetch(`${process.env.PUBLIC_URL}/api/get-mealplan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            }).then((response) => response.json()).then((data) => {
                console.log(data.data)
                let par = { num: this.state.planType, data: data }
                this.setState({ loading: false, redirect: true, data: par });
            });

        });
    }


    render() {
        const { selectOpt, dietSpec, healthSpec } = this.state.data;

        return (
            <div className="Survey">
                {
                    this.state.loading ?
                        <div className="Survey__loading">
                            <h1 className="Survey__loading__heading">Preparing Your Meal Plan</h1>
                            {/* <FontAwesomeIcon icon={faCircleNotch} className="Survey__loading__icon" /> */}
                            <img src={logo} className="Survey__loading__icon" />
                        </div>
                        : <div className="Survey__content">

                            <div className="Survey__heading"><h1>Just Some Quick Questions</h1></div>
                            <form>
                                <Tabs defaultIndex={0} ref={this.tabs} className="Survey__tabs">
                                    <Tab heading="1">
                                        <h2>How many meals do you want to have in a day?</h2>
                                        <Select name="mealCount" value={this.state.mealCount} handler={this.handleSelect} options={selectOpt.mealCount} />
                                        <div className="Survey__goto">
                                            <Button name="next" onClick={this.goTo} className="next-btn">Next</Button>
                                        </div>
                                    </Tab>
                                    <Tab heading="2">
                                        <h2>Choose a plan type</h2>
                                        <Select name="planType" value={this.state.planType} handler={this.handleSelect} options={selectOpt.planType} />
                                        <div className="Survey__goto">
                                            <Button name="back" onClick={this.goTo} className="back-btn">Back</Button>
                                            <Button name="next" onClick={this.goTo} className="next-btn">Next</Button>
                                        </div>
                                    </Tab>
                                    <Tab heading="3">
                                        <h2>Any dietary preferences?</h2>
                                        <RadioGroup handleChange={this.handleDiet} activeIndex={this.state.diet.activeIndex}>
                                            {
                                                dietSpec.map(
                                                    (diet) => <Radio key={diet.name}>{diet.text}</Radio>
                                                )
                                            }
                                        </RadioGroup>
                                        <div className="Survey__goto">
                                            <Button name="back" onClick={this.goTo} className="back-btn">Back</Button>
                                            <Button name="next" onClick={this.goTo} className="next-btn">Next</Button>
                                        </div>
                                    </Tab>

                                    <Tab heading="4" >
                                        <h2>Any health preferences?</h2>
                                        <CheckboxGroup data={healthSpec} toggleHandler={this.handleHealth} isCheckedState={this.state.healthPreferences} ></CheckboxGroup>
                                        <div className="Survey__goto">
                                            <Button name="back" onClick={this.goTo} className="back-btn">Back</Button>
                                            <Button name="next" onClick={this.goTo} className="next-btn">Next</Button>
                                        </div>
                                    </Tab>

                                    <Tab heading="5">
                                        <h2>Calorie intake</h2>
                                        <RadioGroup handleChange={this.handleCalories} activeIndex={this.state.calories.activeIndex}>
                                            <Radio>Go with recommended</Radio>
                                            <Radio>Choose custom values</Radio>
                                        </RadioGroup>
                                        {
                                            this.state.calories.selected === "custom" ?
                                                (<div className="Survey__input--custom">
                                                    <input placeholder="min" type="number" name="min" onChange={this.setCalories} value={this.state.calories.min} />
                                                    <input placeholder="max" type="number" name="max" onChange={this.setCalories} value={this.state.calories.max} />
                                                </div>
                                                )
                                                : null
                                        }
                                        <div className="Survey__goto">
                                            <Button name="back" onClick={this.goTo} className="back-btn">Back</Button>
                                            <Button onClick={this.getMealPlan} className="next-btn">Get Plan!</Button>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </form>
                        </div>
                }
                {
                    this.state.redirect ? <Navigate to='/meal-plan' state={{ data: this.state.data }} /> : null
                }

            </div>
        );
    }
}

export default MealSurvey;
