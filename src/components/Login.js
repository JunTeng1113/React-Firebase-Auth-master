import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Row } from "react-bootstrap";
// import * as Icon from 'react-bootstrap-icons';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signInWithGoogle, signInWithApple } from "../firebase";
import PhoneSignUp from "./LoginWithPhoneNumber";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    console.log(login);

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            // login(emailRef.current.value, passwordRef.current.value)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("登入失敗")
        }

        setLoading(false)
    }

    async function loginWithGoogle() {
        await signInWithGoogle()
        navigate("/")
    }
    
    async function loginWithApple() {
        await signInWithApple()
        console.log(123)
        navigate("/")
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">登入</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>電子信箱</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>密碼</Form.Label><span className="ml-2"><Link to="/forgot-password">忘記密碼？</Link></span>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            登入
                        </Button>
                    </Form>
                    <hr />
                    <Row className="mx-0 my-2">
                        <Button as={0} variant="primary" className="col" onClick={loginWithGoogle}>Google</Button>
                        <Button as={0} variant="primary" className="col ml-4">
                            {/* <Link to="/login-with-phone-number"></Link> */}
                            <Link to="/login-with-phone-number" className="text-decoration-none text-reset">手機號碼</Link>
                        </Button>
                        <Button as={0} variant="primary" className="col ml-4" onClick={loginWithApple}>Apple</Button>
                    </Row>
                    {/* <Link to="/login-with-phone-number">
                            Sign in with PhoneNumber
                    </Link> */}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                建立新帳號？ <Link to="/signup">註冊</Link>
            </div>
        </>
    )
}
