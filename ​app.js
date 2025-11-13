import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase Config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyCDUS9TvpHfZTAeecxpAjPNPZRAfFPJeqg",
  authDomain: "reborn-4cdd7.firebaseapp.com",
  projectId: "reborn-4cdd7",
  storageBucket: "reborn-4cdd7.appspot.com",
  messagingSenderId: "712117536027",
  appId: "1:712117536027:web:b9334e06c14403c7c43fbe",
  measurementId: "G-MCFP30JYVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SIGN UP
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("confirm-password").value;
    const message = document.getElementById("message");

    if (!name || !email || !password) {
      message.textContent = "⚠️ Please fill in all fields.";
      return;
    }
    if (password !== confirm) {
      message.textContent = "⚠️ Passwords do not match.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: serverTimestamp()
      });

      message.textContent = "✅ Account created successfully!";
      message.style.color = "#00ffcc";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      message.textContent = "❌ " + error.message;
      message.style.color = "#ffcccc";
    }
  });
}

// LOGIN
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    if (!email || !password) {
      message.textContent = "⚠️ Please enter email and password.";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.textContent = "✅ Logged in successfully!";
      message.style.color = "#00ffcc";

      setTimeout(() => {
        window.location.href = "home.html"; // redirect page
      }, 1500);
    } catch (error) {
      message.textContent = "❌ " + error.message;
      message.style.color = "#ffcccc";
    }
  });
}
