// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage,connectStorageEmulator } from "firebase/storage";
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
export const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');
// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, 'localhost', 8080);
// Initialize Firebase Firestore and get a reference to the service
export const storage = getStorage(firebaseApp);
connectStorageEmulator(storage, 'localhost', 9199);

// if(location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('http://localhost:8080');
//     storage.useEmulator('localhost', 9199);
// }
