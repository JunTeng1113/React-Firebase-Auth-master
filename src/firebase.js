import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

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


const googleProvider = new firebase.auth.GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//     try {
//         const result = await auth.signInWithPopup(googleProvider) //登入方式：Popup：彈跳視窗，Redirect：新分頁
//         console.log(`===============`);
//         console.log(`Google: `);
//         console.log(result);
//         console.log(`===============`);
//         const name = result.user.displayName;
//         const email = result.user.email;
//         const profilePic = result.user.photoURL;

//         localStorage.setItem("name", name);
//         localStorage.setItem("email", email);
//         localStorage.setItem("profilePic", profilePic);
//     } catch (error) {
//         console.log(error);
//     }
// }

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
const firebaseConfig = {
    apiKey: "AIzaSyB9LhMl0FC9Og6ExEk7GBfLZQK1jYKYvhY",
    authDomain: "toysrbooks.firebaseapp.com",
    projectId: "toysrbooks",
    storageBucket: "toysrbooks.appspot.com",
    messagingSenderId: "683282258435",
    appId: "1:683282258435:web:c7355d0ccd32e2d2ef4c36",
    measurementId: "G-3PTZ2M8WDX"
};
const appleApp = firebase.initializeApp(firebaseConfig, "appleApp")

const appleAuth = appleApp.auth()

const appleProvider = new firebase.auth.OAuthProvider('apple.com');

export const signInWithApple = async () => {
    await appleAuth.signInWithPopup(appleProvider)
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

