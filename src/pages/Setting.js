import { useState } from 'react';
import {
    Button, Form, InputGroup, Alert,
} from 'react-bootstrap';
import './Setting.css';

const Setting = function (props) {
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const [zip, setZip] = useState(props.zipcode);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [invalidZip, setInvalidZip] = useState(false);
    const alertTime = 6000;

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
                setZip(null);
                props.setZipcode(zip);
            }
        });
    };

    return (
        <div id="parent" className="pt-3">
            <h1 className="mb-5 ">Setting Page</h1>
            <Form onSubmit={updateZipcode} className="zip-form">
                <InputGroup className="w-25 mb-4 px-3">
                    <InputGroup.Text>
                        Zip code
                    </InputGroup.Text>
                    <Form.Control
                        data-testid="zipcode-input"
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
                <Button variant="danger" onClick={clearZipcode} className="mb-4">
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
                    Save
                    {' '}
                    {zip}
                    {' '}
                    successful
                </Alert.Heading>
            </Alert>
        </div>
    );
};

export default Setting;
