import React, { useState } from 'react';
import {
    Button, Form, InputGroup, Image,
} from 'react-bootstrap';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './MyRecipes.css';
import logo from '../logo.png';

const AddRecipe = function () {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [picture, setPicture] = useState(null);
    const [pictureURL, setPictureURL] = useState(null);
    const [errors, setErrors] = useState({});
    const findFormErrors = () => {
        const newErrors = {};
        if (!name || name === '') newErrors.name = 'Give your recipe a name!';
        if (name.length > 80) newErrors.name = 'That is a long name!';
        if (!ingredients || ingredients === '') newErrors.ingredients = 'Can\'t make a recipe without any ingredients!';
        if (!directions || directions === '') newErrors.directions = 'Zero directions?? Unbelievable!!';
        return newErrors;
    };

    const handleSubmit = function () {
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('ingredients', ingredients);
            formData.append('directions', directions);
            if (picture !== null) {
                formData.append('picture', picture);
                console.log('GET IMAGE');
            }
            fetch(`${process.env.PUBLIC_URL}/api/add-my-recipe`, {
                method: 'POST',
                body: formData,
            }).then((response) => response.json()).then((data) => {
                // TODO: error handling and redirect user to my recipes page
                console.log(`callback: ${data}`);
            });
        }
    };

    const handleImage = function (e) {
        setPicture(e.target.files[0]);
        setPictureURL(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="AddRecipe">
            <h1 className="add-recipe-title">Add New Recipe</h1>
            <InputGroup className="mb-3 ">
                <InputGroup.Text>Name:</InputGroup.Text>
                <Form.Control
                    value={name}
                    isInvalid={!!errors.name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3 ">
                <InputGroup.Text>Ingredients:</InputGroup.Text>
                <Form.Control
                    placeholder="Please separate the ingredients by comma "
                    value={ingredients}
                    isInvalid={!!errors.ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.ingredients}
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup.Text>Directions:</InputGroup.Text>
            <InputGroup className="mb-3 ">
                <div className="rich-text w-100 ">
                    <DefaultEditor value={directions} onChange={(e) => (setDirections(e.target.value))} />
                </div>
                {errors.directions ? <p className="invalid-directions">{errors.directions}</p> : null}
            </InputGroup>
            <InputGroup className="mt-3 ">
                <Form.Control
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleImage}
                />
            </InputGroup>
            <Image className="recipe-picture" src={picture ? pictureURL : logo} rounded />
            <Button className="add-recipe-btn" size="lg" variant="dark" onClick={handleSubmit}>Submit</Button>
        </div>

    );
};

export default AddRecipe;
