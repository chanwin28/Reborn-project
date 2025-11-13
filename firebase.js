import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkTRy0nhb_mUOmoaGQZwouMJPCC37uRRQ",
  authDomain: "plexiform-being-471915-u1.firebaseapp.com",
  projectId: "plexiform-being-471915-u1",
  storageBucket: "plexiform-being-471915-u1.firebasestorage.app",
  messagingSenderId: "477134304630",
  appId: "1:477134304630:web:a7af00f276bdcfd2c77657",
  measurementId: "G-VDCF2TGMET"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);