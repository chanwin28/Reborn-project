import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkTRy0nhb_mUOmoaGQZwouMJPCC37uRRQ",
  authDomain: "plexiform-being-471915-u1.firebaseapp.com",
  projectId: "plexiform-being-471915-u1",
  storageBucket: "plexiform-being-471915-u1.firebasestorage.app",
  messagingSenderId: "477134304630",
  appId: "1:477134304630:web:a7af00f276bdcfd2c77657",
  measurementId: "G-VDCF2TGMET"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
