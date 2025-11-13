import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const authForm = document.getElementById("authForm");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");
const nameField = document.getElementById("nameField");
const submitBtn = document.getElementById("submitBtn");

let isSignup = true; // default: signup mode

// 🧩 Toggle between Login / Signup
toggleText.addEventListener("click", () => {
  isSignup = !isSignup;
  if (isSignup) {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Signup";
    toggleText.textContent = "Already have an account? Login";
    nameField.style.display = "block";
  } else {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleText.textContent = "Don't have an account? Signup";
    nameField.style.display = "none";
  }
});

// 🧩 Handle form submit
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  if (isSignup) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      alert("✅ Signup successful!");
    } catch (error) {
      alert("❌ Signup error: " + error.message);
    }
  } else {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
    } catch (error) {
      alert("❌ Login error: " + error.message);
    }
  }

  authForm.reset();
});