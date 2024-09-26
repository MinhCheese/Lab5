import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqtWbQ1ve5q0UZ6tQUb6wQIhZD6IILD04",
    authDomain: "lab5-1d305.firebaseapp.com",
    projectId: "lab5-1d305",
    storageBucket: "lab5-1d305.appspot.com",
    messagingSenderId: "794793380848",
    appId: "1:794793380848:web:d35710c18d418d485bab35",
    measurementId: "G-YCJRF7ZN3R"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
