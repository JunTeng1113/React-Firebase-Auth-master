import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
// import * as Icon from 'react-bootstrap-icons';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { signInWithGoogle } from "../firebase";


export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("登入失敗")
    }

    setLoading(false)
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
              <Form.Label>密碼</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              登入
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">忘記密碼？</Link>
          </div>
          <button className="w-100" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <Link to="/login-with-phone-number">
              Sign in with PhoneNumber
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        建立新帳號？ <Link to="/signup">註冊</Link>
      </div>
    </>
  )
}
