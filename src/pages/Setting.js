import { useState, useRef } from 'react';
import {
    Button, Form, InputGroup, Alert,
} from 'react-bootstrap';
import './Setting.css';

const Setting = function (props) {
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const [zip, setZip] = useState(props.zipcode);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [removeAlert, setRemoveAlert] = useState(false);
    const [invalidZip, setInvalidZip] = useState(false);
    const alertTime = 3000;
    const formRef = useRef(null);

    function showSuccessAlert() {
        setSuccessAlert(true);
        setTimeout(() => {
            setSuccessAlert(false);
        }, alertTime);
    }
    function showErrorAlert() {
        setErrorAlert(true);
        setTimeout(() => {
            setErrorAlert(false);
        }, alertTime);
    }
    function showRemoveAlert() {
        setRemoveAlert(true);
        formRef.current.reset();
        setTimeout(() => {
            setRemoveAlert(false);
            setZip(null);
            props.setZipcode(null);
        }, alertTime);
    }
    const updateZipcode = (event) => {
        event.preventDefault();
        if (!zipRegex.test(zip)) {
            setInvalidZip(true);
        } else {
            setInvalidZip(false);
            fetch(`${process.env.PUBLIC_URL}/update-zipcode`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zipcode: zip }),
            }).then((response) => response.json()).then((data) => {
                if (data.error === true) {
                    showErrorAlert();
                } else {
                    props.setZipcode(zip);
                    showSuccessAlert();
                }
            });
        }
    };

    const clearZipcode = () => {
        setInvalidZip(false);
        fetch(`${process.env.PUBLIC_URL}/update-zipcode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ zipcode: null }),
        }).then((response) => response.json()).then((data) => {
            if (data.error === true) {
                setHasError(true);
            } else {
                showRemoveAlert();
            }
        });
    };

    return (
        <div id="parent" className="pt-3">
            <h1 className="mb-5 ">Setting Page</h1>
            <Form onSubmit={updateZipcode} className="zip-form" ref={formRef}>
                <InputGroup className="w-25 mb-4 px-3">
                    <InputGroup.Text>
                        Zip code
                    </InputGroup.Text>
                    <Form.Control
                        type="number"
                        defaultValue={props.zipcode}
                        placeholder="zip code"
                        onChange={(e) => setZip(e.target.value)}
                        isInvalid={invalidZip}
                    />
                    <Form.Control.Feedback type="invalid">
                        Invalid zip code
                    </Form.Control.Feedback>
                </InputGroup>
                <Button variant="success" type="submit" className="mb-4">
                    Save
                </Button>
                <Button variant="danger" className="mb-4" onClick={clearZipcode}>
                    Remove
                </Button>
            </Form>
            <Alert variant="danger" show={errorAlert} onClose={() => setErrorAlert(false)} dismissible>
                <Alert.Heading>
                    Sorry we are unable to save your change! Please try again!
                </Alert.Heading>
            </Alert>
            <Alert variant="success" show={successAlert} onClose={() => setSuccessAlert(false)} dismissible>
                <Alert.Heading>
                    Successfully save
                    {' '}
                    {zip}
                </Alert.Heading>
            </Alert>
            <Alert variant="warning" show={removeAlert} onClose={() => setRemoveAlert(false)} dismissible>
                <Alert.Heading>
                    Successfully remove
                    {' '}
                    {zip}
                </Alert.Heading>
            </Alert>
        </div>
    );
};

export default Setting;
