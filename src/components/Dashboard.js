import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Dashboard() {
  console.log("Dashboard is triggered");
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")
    
    try {
      logout()
      // await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">個人資訊</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="row">
            <div className="col text-center">
              <img src={currentUser.photoURL} className="border"/>
            </div>
          </div>
          
          <div className="row">
            <span className="col col-5 text-right">Email:</span><span className="col col-7 text-left">{currentUser.email}</span>
          </div>
          <div className="row">
            <span className="col col-5 text-right">PhoneNumber:</span><span className="col col-7 text-left">{currentUser.phoneNumber}</span>
          </div>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            更新資訊
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          登出
        </Button>
      </div>
    </>
  )
}
