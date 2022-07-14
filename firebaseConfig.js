import { initializeApp } from "firebase/app";
import { getAuth,  RecaptchaVerifier  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseApp={
    apiKey: "AIzaSyDV_bXxf4AEfwgva1OvXgUZFBJ0D2j7m2w",
    authDomain: "ujb-auth-login-app.firebaseapp.com",
    projectId: "ujb-auth-login-app",
    storageBucket: "ujb-auth-login-app.appspot.com",
    messagingSenderId: "320676018585",
    appId: "1:320676018585:web:bec0e4b80b7387af42bb08"
};

const app =initializeApp(firebaseApp);
const db = getFirestore();
const auth = getAuth(app);

export { db, auth }


