// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeMDdFDgw_IqlX-ckTGG5H_ydWmaO6joo",
    authDomain: "blog-marn.firebaseapp.com",
    projectId: "blog-marn",
    storageBucket: "blog-marn.appspot.com",
    messagingSenderId: "375571533046",
    appId: "1:375571533046:web:c78eafb4fc9c63290f70d7",
    measurementId: "G-X68ZKSLJJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const authWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user
    } catch (error) {
        console.log(error)
    }

}

// const analytics = getAnalytics(app);