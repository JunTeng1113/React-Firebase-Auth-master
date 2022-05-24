import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Row } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useAuth } from "../contexts/AuthContext";
import { generateRecaptcha1 } from "../firebase"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";

export default function PhoneSignUp() {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    // const { setUpRecaptha } = useAuth();
    const navigate = useNavigate();

    const auth = getAuth();
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
              // reCAPTCHA solved, allow si gnInWithPhoneNumber.
              // ...
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
        }, auth);
        console.log(window.recaptchaVerifier);
    }
    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (number === "" || number === undefined)
            return setError("請輸入一個有效的手機號碼！");
        try {
            generateRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const response = signInWithPhoneNumber(auth, number, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    setResult(confirmationResult);
                    setFlag(true);
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                    console.log(error);
                });
            // const response = await setUpRecaptha(number);
            console.log(response);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            console.log(otp);
            await result.confirm(otp);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">手機號碼驗證</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <PhoneInput
                            defaultCountry="TW"
                            value={number}
                            onChange={ (e) => {setNumber(e)}}
                            placeholder="輸入手機號碼"
                        />
                        <div id="recaptcha-container" className="col my-2"></div>
                    </Form.Group>
                    <div className="text-center mb-4">
                        <Link to="/login">
                            <Button variant="secondary">取消</Button>
                        </Link>
                        &nbsp;
                        <Button type="submit" variant="primary">
                            發送驗證碼
                        </Button>
                    </div>
                </Form>

                <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Control
                            type="otp"
                            placeholder="Enter OTP"
                            onChange={(e) => { setOtp(e.target.value) }}
                        />
                    </Form.Group>
                    <div className="text-center mb-4">
                        <Link to="/">
                            <Button variant="secondary">Cancel</Button>
                        </Link>
                        &nbsp;
                        <Button type="submit" variant="primary" >
                            Verify
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
