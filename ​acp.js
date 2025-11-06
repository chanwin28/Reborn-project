const container = document.querySelector(".container");
const signupToggle = document.querySelector(".signup-toggle");
const toggleLogin = document.querySelector(".toggle-login");

signupToggle.addEventListener("click", () => {
  container.classList.add("active");
});

toggleLogin.addEventListener("click", () => {
  container.classList.remove("active");
});
