// ✅ Import Firebase SDKs (v10.13.0)
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

// ✅ Firebase Config (မင်း Firebase console ထဲကကို ထည့်)
const firebaseConfig = {
  apiKey: "AIzaSyCDUS9TypHfZTAeecxpAjPNPZRAfFPJeqg",
  authDomain: "reborn-4cdd7.firebaseapp.com",
  projectId: "reborn-4cdd7",
  storageBucket: "reborn-4cdd7.appspot.com",
  messagingSenderId: "712117536027",
  appId: "1:712117536027:web:b9334e06c14403c7c43fbe",
  measurementId: "G-MCFP30JYVV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase Connected");

// ✅ SIGN UP
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!name || !email || !password) {
      message.textContent = "Please fill all fields.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      await addDoc(collection(db, "users"), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      message.textContent = "🎉 Signup successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      message.textContent = "❌ " + error.message;
    }
  });
}

// ✅ LOGIN
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const message = document.getElementById("login-message");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.textContent = "✅ Login successful!";
      setTimeout(() => {
        window.location.href = "welcome.html";
      }, 1500);
    } catch (error) {
      message.textContent = "❌ " + error.message;
    }
  });
}
