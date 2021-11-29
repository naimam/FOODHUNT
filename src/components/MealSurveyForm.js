/* eslint-disable */
import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './MealSurveyForm.css';

const generateId = () => (
    '_' + Math.random().toString(36).substr(2, 9)
)

export default class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.defaultIndex || 0,
        }
    }

    handleClick = (index) => this.setState({ activeIndex: index });

    // passing default props to all tabs
    passPropsToTabs() {
        const { children } = this.props;
        return React.Children.map(children, (child, index) =>
            React.cloneElement(
                child,
                {
                    index: index,
                    onClick: this.handleClick,
                    active: index === this.state.activeIndex,
                },
            )
        )
    }

    renderTabContent() {
        const { children } = this.props;
        const { activeIndex } = this.state;
        if (children[activeIndex]) {
            return children[activeIndex].props.children;
        }
    }

    render() {
        return (
            <div className={`Tabs ${this.props.className}`}>
                <ul className="Tabs__head">
                    {this.passPropsToTabs()}
                </ul>
                <div className="Tabs__content">
                    {this.renderTabContent()}
                </div>
            </div>
        )
    }

}
const Tab = (props) => (
    <li className={`Tab ${props.className}`}>
        <a className={`Tab__link ${props.active ? 'Tab__active' : ''}`}
            onClick={
                (e) => {
                    e.preventDefault();
                    props.onClick(props.index)
                }
            }>
            <span>{props.heading}</span>
        </a>
    </li>
);

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'regular',
            link: props.link || false,
        }
    }
    get = () => {
        return (
            <button name={this.props.name}
                className={`Button Button--${this.state.type} ${this.props.className}`}
                onClick={this.props.onClick}
                style={this.props.style}>
                {this.props.children}
            </button>
        )
    }
    render() {
        const content = this.get();
        return (
            this.state.link ?
                (
                    <Link to={this.props.path || "#"}>
                        {content}
                    </Link>
                )
                : content
        )
    }
}
Button.propTypes = {
    type: Proptypes.oneOf(['regular', 'accent', 'transparent']),
    link: Proptypes.bool,
    path: Proptypes.string,
    className: Proptypes.string,
    onClick: Proptypes.func,
    style: Proptypes.object
}

Tab.propTypes = {
    active: Proptypes.bool,
    onClick: Proptypes.func,
    index: Proptypes.number,
    heading: Proptypes.string,
    className: Proptypes.string
}
Tabs.propTypes = {
    defaultIndex: Proptypes.number,
    className: Proptypes.string
}

const createCheckbox = (data, toggleHandler, isCheckedState) => (
    <Checkbox
        name={data.name}
        handler={toggleHandler}
        key={data.name}
        isChecked={isCheckedState[data.name] ? true : false}
        text={data.text}
    />
);

const CheckboxGroup = (props) => (
    <div className={`${props.className}`}>
        {props.data.map((checkboxData) => createCheckbox(checkboxData, props.toggleHandler, props.isCheckedState))}
    </div>
);

const Checkbox = (props) => {
    const { name, text, isChecked, handler } = props;
    const id = generateId();
    return (
        <div className="Checkbox">
            <label htmlFor={id} className={`Checkbox__label ${props.className}`}>
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                        handler(name);
                    }}
                />
                {text}
            </label>
        </div>
    )
}
Checkbox.propTypes = {
    name: Proptypes.string,
    text: Proptypes.string,
    isChecked: Proptypes.bool,
    handler: Proptypes.func,
    className: Proptypes.string
}
CheckboxGroup.propTypes = {
    data: Proptypes.array,
    toggleHandler: Proptypes.func,
    isCheckedState: Proptypes.object,
    className: Proptypes.string
}

class RadioGroup extends Component {

    passPropsToChildren = () => {
        const { children, handleChange, activeIndex } = this.props;
        return React.Children.map(children, (child, index) =>
            React.cloneElement(
                child,
                {
                    index: index,
                    onChange: handleChange,
                    checked: index === activeIndex,
                },
            )
        );
    }
    render() {
        return (
            <div className={`RadioGroup ${this.props.className}`} >
                {this.passPropsToChildren()}
            </div>
        )
    }
}
const Radio = (props) => {
    const id = generateId();
    return (
        <div>
            <input className="Radio" type="radio" checked={props.checked} name={props.name} id={id}
                onChange={
                    () => {
                        props.onChange(props.index);
                    }
                } />
            <label htmlFor={id} className={props.className}>{props.children}</label>
        </div>
    );
}

Radio.propTypes = {
    name: Proptypes.string,
    index: Proptypes.number,
    onChange: Proptypes.func,
    checked: Proptypes.bool,
    className: Proptypes.string
}
RadioGroup.propTypes = {
    activeIndex: Proptypes.number,
    handleChange: Proptypes.func,
    className: Proptypes.string
}

const Select = (props) => (
    <select value={props.value} onChange={props.handler} name={props.name} className={`Select ${props.className}`}>
        {
            props.options.map(
                (ele) => <option value={ele.val} key={ele.val}>{ele.text}</option>
            )
        }
    </select>
)
Select.propTypes = {
    value: Proptypes.number,
    handler: Proptypes.func,
    name: Proptypes.string,
    className: Proptypes.string,
    options: Proptypes.array
}

export {
    Tab,
    Button,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Select
}