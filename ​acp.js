document.addEventListener('DOMContentLoaded', () => {
    const loginPanel = document.getElementById('login-form');
    const signupPanel = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    // Function to switch forms
    const switchForm = (showPanel, hidePanel) => {
        hidePanel.classList.remove('active');
        // A small delay for the fade-out effect
        setTimeout(() => {
            showPanel.classList.add('active');
        }, 10); // minimal delay
    };

    // Event listener for showing Sign Up
    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(signupPanel, loginPanel);
        });
    }

    // Event listener for showing Login
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(loginPanel, signupPanel);
        });
    }

    // You can add form validation logic here later if needed.
    // Example:
    // const loginForm = loginPanel.querySelector('form');
    // loginForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     alert('Login attempt...');
    //     // Add actual login logic (e.g., fetch API)
    // });
});
