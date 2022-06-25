import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APPLE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_APPLE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_APPLE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_APPLE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_APPLE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_APPLE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPLE_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app

// 未使用
export const generateRecaptcha1 = (auth1) => {
    console.log(auth1);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow si gnInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
    }, auth1);
}

// 未使用
export const signInWithPhoneNumber = async (number, appVerifier) => {
    firebase.auth().signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
            console.log("====================");
            console.log("signInWithPhoneNumber");
            console.log(confirmationResult)
            console.log("====================");
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            return confirmationResult;
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error);
        });
}

/*==================================================*/
/*  SignIn With Google.                             */
/*==================================================*/
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleProvider)
    .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = result.credential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        const name = user.displayName;
        const email = user.email;
        const profilePic = user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
        console.log(error)
    })
}

/*==================================================*/
/*  SignIn With Apple.                              */
/*==================================================*/
const appleProvider = new firebase.auth.OAuthProvider('apple.com');

export const signInWithApple = async () => {
    await auth.signInWithPopup(appleProvider)
    .then((result) => {
        console.log("=========================")
        console.log("signInWithApple");
        console.log(result);
        console.log("=========================")
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = result.credential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        const name = user.displayName;
        const email = user.email;
        const profilePic = user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
        console.log(error)
    })
}

/*==================================================*/
/*  Configure FirebaseUI.                           */
/*==================================================*/

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        'apple.com'
    ],
};
const ui = new firebaseui.auth.AuthUI(firebase.auth());
export function SocialLogin() {
    useEffect(() => {
        const oldDelete = ui.delete
        ui.delete = () => {
        }
        return () => {
            ui.delete = oldDelete
        }
    })
    ui.start('#firebaseui-auth-container', uiConfig);
    return (
        <div id='firebaseui-auth-container'></div>
    )
}

