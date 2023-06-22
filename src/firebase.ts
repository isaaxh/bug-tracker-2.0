// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const apiKey = import.meta.env.VITE_AUTH_API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "bug-tracker-2.firebaseapp.com",
    projectId: "bug-tracker-2",
    storageBucket: "bug-tracker-2.appspot.com",
    messagingSenderId: "750375202493",
    appId: "1:750375202493:web:4d9b9ad604987952add1d4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
// Initialize Firebase Firestore and get a reference to the service
export const storage = getStorage(firebaseApp);
