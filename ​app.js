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

// Firebase Config
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

console.log("🔥 Firebase Connected");

// Elements
const title = document.getElementById("form-title");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const message = document.getElementById("message");
const actionBtn = document.getElementById("action-btn");
const toggleLink = document.getElementById("toggle-link");

let isLogin = true;

// Toggle between Login & Signup
toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    title.textContent = "Login";
    actionBtn.textContent = "Login";
    toggleLink.textContent = "Sign up";
    fullname.classList.add("hidden");
    confirmPassword.classList.add("hidden");
    message.textContent = "";
  } else {
    title.textContent = "Sign Up";
    actionBtn.textContent = "Sign Up";
    toggleLink.textContent = "Login";
    fullname.classList.remove("hidden");
    confirmPassword.classList.remove("hidden");
    message.textContent = "";
  }
});

// Main button (Login / Signup)
actionBtn.addEventListener("click", async () => {
  message.textContent = "";
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  if (isLogin) {
    // LOGIN
    if (!emailVal || !passVal) {
      message.textContent = "⚠️ Please enter email and password.";
      message.style.color = "red";
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailVal, passVal);
      message.textContent = "✅ Login Successful!";
      message.style.color = "green";
      console.log("Login Success:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error);
      message.textContent = error.message;
      message.style.color = "red";
    }

  } else {
    // SIGNUP
    const nameVal = fullname.value.trim();
    const confirmVal = confirmPassword.value.trim();

    if (!nameVal || !emailVal || !passVal || !confirmVal) {
      message.textContent = "⚠️ Please fill all fields!";
      message.style.color = "red";
      return;
    }

    if (passVal !== confirmVal) {
      message.textContent = "⚠️ Passwords do not match!";
      message.style.color = "red";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailVal, passVal);
      await updateProfile(userCredential.user, { displayName: nameVal });
      await addDoc(collection(db, "users"), {
        name: nameVal,
        email: emailVal,
        createdAt: serverTimestamp(),
      });

      message.textContent = "✅ Account Created Successfully!";
      message.style.color = "green";
      console.log("Signup Success:", userCredential.user);
    } catch (error) {
      console.error("Signup Error:", error);
      message.textContent = error.message;
      message.style.color = "red";
    }
  }
});
