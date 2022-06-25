import React, { useRef, useState } from "react";
import LoginWithWeb from './loginWithWeb';

import { useNavigate } from "react-router-dom";

import { Button } from 'react-bootstrap';

export default function Login() {
    let navigate = useNavigate();
    return (
        <>
        <Button variant="outline-primary" onClick={(e) => navigate('firebase')}>Firebase SDK</Button>{' '}
        <Button variant="outline-primary" onClick={(e) => navigate('firebaseUI')}>FirebaseUI Auth</Button>
        </>
    )
}
