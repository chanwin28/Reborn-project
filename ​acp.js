document.addEventListener('DOMContentLoaded', () => {
    const loginPanel = document.getElementById('login-form');
    const signupPanel = document.getElementById('signup-form');
    // Login Form မှ Sign Up Button
    const showSignupBtn = document.getElementById('show-signup-btn'); 
    // Sign Up Form မှ Log In Link
    const showLoginLink = document.getElementById('show-login-link'); 

    // Function to switch forms
    const switchForm = (showPanel, hidePanel) => {
        // 1. Hide current panel with fade out
        hidePanel.classList.remove('active');
        hidePanel.style.opacity = '0';
        
        // 2. Wait for the fade out transition to complete (0.5s)
        setTimeout(() => {
            hidePanel.style.display = 'none';
            showPanel.style.display = 'block';
            
            // 3. Show new panel with fade in
            setTimeout(() => {
                showPanel.classList.add('active');
                showPanel.style.opacity = '1';
            }, 10);
        }, 500);
    };

    // Event Listeners for switching
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(signupPanel, loginPanel);
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm(loginPanel, signupPanel);
        });
    }
});
