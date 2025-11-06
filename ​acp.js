// HTML elements များကို ရယူခြင်း
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupButton = document.getElementById('showSignup');
const showLoginButton = document.getElementById('showLogin');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');

// Server API URL ကို သတ်မှတ်ခြင်း (အဆင့် ၁ မှ)
const BASE_URL = 'http://localhost:3000/api'; 
// (Server က 3000 မှာ run နေတယ်လို့ ယူဆထားပါတယ်)

// Form ကူးပြောင်းတဲ့ Function (ယခင်အတိုင်း)
function switchForm(showForm, hideForm) {
    hideForm.classList.remove('active-form');
    hideForm.classList.add('hidden-form');
    
    setTimeout(() => {
        showForm.classList.remove('hidden-form');
        showForm.classList.add('active-form');
    }, 100);
}

// Signup ကိုပြောင်းရန်
showSignupButton.addEventListener('click', () => {
    loginMessage.textContent = '';
    switchForm(signupForm, loginForm);
});

// Login ကိုပြောင်းရန်
showLoginButton.addEventListener('click', () => {
    signupMessage.textContent = '';
    switchForm(loginForm, signupForm);
});


// ====================================
// 🚨 Password Strength Checker Function (အသစ်)
// ====================================
function checkPasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length < minLength) {
        return "❌ Password သည် အနည်းဆုံး ၈ လုံး ရှိရပါမည်။";
    }
    if (!hasUpperCase) {
        return "❌ အနည်းဆုံး အက္ခရာအကြီး (A-Z) တစ်လုံး ပါရပါမည်။";
    }
    if (!hasLowerCase) {
        return "❌ အနည်းဆုံး အက္ခရာအသေး (a-z) တစ်လုံး ပါရပါမည်။";
    }
    if (!hasNumber) {
        return "❌ အနည်းဆုံး ဂဏန်း (0-9) တစ်လုံး ပါရပါမည်။";
    }
    if (!hasSpecialChar) {
        return "❌ အနည်းဆုံး သင်္ကေတ (@, #, $) တစ်လုံး ပါရပါမည်။";
    }

    return null; // အားလုံး မှန်ကန်လျှင် null ပြန်ပေးမည်။
}


// ====================================
// Login လုပ်ဆောင်ချက် (ယခင်အတိုင်း)
// ====================================
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMessage.textContent = '...စစ်ဆေးနေသည်...';
    loginMessage.style.color = '#fff';

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); 

        if (data.success) {
            loginMessage.textContent = `✅ ${data.message}`;
            loginMessage.style.color = '#6dff77';
        } else {
            loginMessage.textContent = `❌ ${data.message}`;
            loginMessage.style.color = '#ff6d6d';
        }
    } catch (error) {
        console.error('Login Error:', error);
        loginMessage.textContent = '❌ Server နဲ့ ချိတ်ဆက်မှု ပြဿနာရှိနေပါတယ်။';
        loginMessage.style.color = '#ff6d6d';
    }
});


// ====================================
// SIGNUP လုပ်ဆောင်ချက် (Password စစ်ဆေးမှု ထပ်ထည့်ထားသည်)
// ====================================
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signupMessage.textContent = '...မှတ်ပုံတင်နေသည်...';
    signupMessage.style.color = '#fff';

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // 🚨 Password Strength စစ်ဆေးခြင်း
    const strengthError = checkPasswordStrength(password);
    if (strengthError) {
        signupMessage.textContent = strengthError;
        signupMessage.style.color = '#ff6d6d'; // အနီရောင် error ပြခြင်း
        return; // Password မကောင်းရင် ဆက်မလုပ်တော့ဘူး
    }

    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (data.success) {
            signupMessage.textContent = `🎉 ${data.message}`;
            signupMessage.style.color = '#6dff77';
            
            setTimeout(() => {
                signupForm.reset();
                signupMessage.textContent = '';
                switchForm(loginForm, signupForm);
            }, 2000); 
        } else {
            signupMessage.textContent = `❌ ${data.message}`;
            signupMessage.style.color = '#ff6d6d';
        }

    } catch (error) {
        console.error('Signup Error:', error);
        signupMessage.textContent = '❌ Server နဲ့ ချိတ်ဆက်မှု ပြဿနာရှိနေပါတယ်။';
        signupMessage.style.color = '#ff6d6d';
    }
});
