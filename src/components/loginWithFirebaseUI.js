import React, { useState, useEffect } from "react";
import { SocialLogin } from "../firebase";

export default function LoginWithFirebaseUI() {
    
    const [widget, setWidget] = useState(null);

    useEffect(() => {
        setWidget(<SocialLogin />)
    }, [])

    return (
        <div id='firebaseui-auth-container'>
            {widget}
        </div>
    )
}
