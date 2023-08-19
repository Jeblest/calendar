// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgrLpYTg_i4z7E4l7j8kO-opD4Tiy9U6k",
  authDomain: "calendar-395710.firebaseapp.com",
  projectId: "calendar-395710",
  storageBucket: "calendar-395710.appspot.com",
  messagingSenderId: "38812954406",
  appId: "1:38812954406:web:04c987c5c7c14ebe399be7",
  measurementId: "G-1XKBW9KK6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);