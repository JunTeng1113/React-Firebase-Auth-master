import React, { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function LoginWithPhoneNumber() {
    const countyCode = "+886";
    const [phoneNumber, setPhoneNumber] = useState(countyCode);
    const [expandForm, setExpandForm] = useState(false);

        // const requestOTP = (e) => {
        //     e.preventDefault();
        //     if (phoneNumber.length >= 10) {
        //         setExpandForm(true);
        //         window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        //             'size': 'invisible',
        //             'callback': (response) => {}
        //         }, auth)
        //     }
        // }


    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">以手機號碼登入</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group id="phoneNumber">
                            <Form.Label>手機號碼</Form.Label>
                            <Form.Control type="email" required />
                        </Form.Group>
                        <Form.Group id="verifyNumber">
                            <Form.Label>驗證碼</Form.Label>
                            <Form.Control type="email" required />
                            <Button className="w-20" type="submit">
                            發送
                            </Button>
                        </Form.Group>
                        <Button className="w-100" type="submit">
                        重設密碼
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
