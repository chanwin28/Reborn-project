function showSignup() {
  loginBox.classList.remove('show');
  signupBox.classList.add('show');
}

function showLogin() {
  signupBox.classList.remove('show');
  loginBox.classList.add('show');
}

function signupUser() {
  const email = signupEmail.value;
  const pass = signupPassword.value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      signupError.textContent = "";
      showWelcome(email);
    })
    .catch(e => signupError.textContent = e.message);
}

function loginUser() {
  const email = loginEmail.value;
  const pass = loginPassword.value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      loginError.textContent = "";
      showWelcome(email);
    })
    .catch(e => loginError.textContent = e.message);
}

function showWelcome(email) {
  loginBox.classList.remove('show');
  signupBox.classList.remove('show');

  userEmail.textContent = email;
  welcomeBox.classList.add('show');
}

function logoutUser() {
  auth.signOut().then(() => {
    welcomeBox.classList.remove('show');
    loginBox.classList.add('show');
  });
}
