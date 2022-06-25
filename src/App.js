import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import PhoneSignUp from "./components/LoginWithPhoneNumber" 
import LoginWithWeb from './components/loginWithWeb';
import LoginWithFirebaseUI from './components/loginWithFirebaseUI';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/'>
                <Route element={<PrivateRoute />}>
                  <Route index element={<Dashboard />} /> 
                </Route>
                <Route path='update-profile' element={<PrivateRoute />}>
                  <Route index element={<UpdateProfile />} />
                </Route>
                
                <Route path="login">
                  <Route index element={<Login />} />
                  <Route path="firebase" >
                    <Route index element={<LoginWithWeb />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="login-with-phone-number" element={<PhoneSignUp />} />
                    <Route path="signup" element={<Signup />} />
                  </Route>

                  <Route path="firebaseUI" element={<LoginWithFirebaseUI />}>
                  </Route>
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
