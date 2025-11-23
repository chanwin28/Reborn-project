// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkTRy0nhb_mUOmoaGQZwouMJPCC37uRRQ",
  authDomain: "plexiform-being-471915-u1.firebaseapp.com",
  projectId: "plexiform-being-471915-u1",
  storageBucket: "plexiform-being-471915-u1.firebasestorage.app",
  messagingSenderId: "477134304630",
  appId: "1:477134304630:web:a7af00f276bdcfd2c77657",
  measurementId: "G-VDCF2TGMET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
