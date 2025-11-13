import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const formTitle = document.getElementById("formTitle");
const authForm = document.getElementById("authForm");
const toggleText = document.getElementById("toggleText");
const nameField = document.getElementById("nameField");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let isSignup = true;

toggleText.addEventListener("click", () => {
  isSignup = !isSignup;
  if (isSignup) {
    formTitle.innerText = "Signup";
    submitBtn.innerText = "Signup";
    nameField.style.display = "block";
    toggleText.innerText = "Already have an account? Login";
  } else {
    formTitle.innerText = "Login";
    submitBtn.innerText = "Login";
    nameField.style.display = "none";
    toggleText.innerText = "Don’t have an account? Signup";
  }
  message.innerHTML = "";
});

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  message.innerHTML = "";

  try {
    if (isSignup) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { name, email, uid: user.uid });
      message.innerHTML = `<p class='success'>✅ Signup successful!</p>`;

      setTimeout(() => {
        window.location.href = "./welcome.html";
      }, 1200);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      message.innerHTML = `<p class='success'>✅ Login successful!</p>`;

      setTimeout(() => {
        window.location.href = "./welcome.html";
      }, 1200);
    }
  } catch (error) {
    console.error(error.message);
    message.innerHTML = `<p class='error'>❌ ${error.message}</p>`;
  }
});
