import { useState } from 'react';
import {
    Button, Form, InputGroup,
} from 'react-bootstrap';
import './Setting.css';

const Setting = function (props) {
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const [zip, setZip] = useState(props.zipcode);
    const [hasError, setHasError] = useState(false);
    const [invalidZip, setInvalidZip] = useState(false);
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
                    setHasError(true);
                } else {
                    props.setZipcode(zip);
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
        <div id="parent">
            Setting Page
            <Form onSubmit={updateZipcode} className="zip-form">
                <InputGroup className="w-50 mb-4 px-3">
                    <InputGroup.Text>
                        Zip code
                    </InputGroup.Text>
                    <Form.Control
                        data-testid="zipcode-input"
                        type="number"
                        defaultValue={props.zipcode}
                        placeholder="Enter your zip code here.."
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

            <h2>
                Has error:
                {' '}
                {hasError.toString()}
            </h2>
            <h2>
                invalid zip code:
                {' '}
                {invalidZip.toString()}
            </h2>
        </div>
    );
};

export default Setting;
