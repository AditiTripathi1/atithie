import { initializeApp } from "firebase/app";
//import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxwDPra-7XWB4rIkU-sYY4DVJF4xpqiso",
  authDomain: "dinner-booking-85218.firebaseapp.com",
  projectId: "dinner-booking-85218",
  storageBucket: "dinner-booking-85218.firebasestorage.app",
  messagingSenderId: "896283031830",
  appId: "1:896283031830:web:a8fd55f5342e3081d73837",
  measurementId: "G-EEZF0N4LC0"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);