// သင်ပေးထားသော Supabase Credentials များ
const supabaseUrl = 'https://okwkibbvaonqolcnnhjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2tpYmJ2YW9ucW9sY25uaGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NzQzNDIsImV4cCI6MjA3ODA1MDM0Mn0.wMENc8uiJFFC5lOYKrjZbump72us7hkaKH00DelAwrs';

// Supabase Client ကို တည်ဆောက်ခြင်း
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements များကို ရယူခြင်း
// Tab Buttons
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
// Forms
const signupCard = document.getElementById('signup-card');
const loginCard = document.getElementById('login-card');
// Forms
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');


// ===================================
// Tab Switching Logic (Signup / Login)
// ===================================

function switchTab(target) {
    if (target === 'signup') {
        // Sign Up ကို ပြသ၊ Login ကို ဖျောက်
        signupCard.classList.remove('hidden');
        loginCard.classList.add('hidden');
        // Button Active ပြောင်း
        showSignupBtn.classList.add('active');
        showLoginBtn.classList.remove('active');
    } else if (target === 'login') {
        // Login ကို ပြသ၊ Sign Up ကို ဖျောက်
        signupCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
        // Button Active ပြောင်း
        showSignupBtn.classList.remove('active');
        showLoginBtn.classList.add('active');
    }
}

// Event Listeners များ
showSignupBtn.addEventListener('click', () => {
    switchTab('signup');
});

showLoginBtn.addEventListener('click', () => {
    switchTab('login');
});


// ===================================
// 1. SIGN UP Logic (Supabase Auth)
// ===================================

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Password နှင့် Confirm Password မတူပါ! ပြန်စစ်ဆေးပေးပါ။');
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        console.error('Sign Up Error:', error.message);
        alert('စာရင်းသွင်းရာတွင် အဆင်မပြေပါ: ' + error.message);
    } else if (data.user) {
        alert('စာရင်းသွင်းခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးပြု၍ သင့် Email ကို စစ်ဆေးပြီး အတည်ပြုပါ။');
        signupForm.reset();
        // Sign Up ပြီးရင် Login Tab ကို အလိုအလျောက်ပြောင်း
        switchTab('login'); 
    }
});


// ===================================
// 2. LOGIN Logic (Supabase Auth)
// ===================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error('Login Error:', error.message);
        alert('Login ဝင်ရာတွင် အဆင်မပြေပါ: ' + error.message);
    } else if (data.user) {
        alert('Login အောင်မြင်ပါပြီ! Welcome, ' + data.user.email);
        loginForm.reset();
        // Login အောင်မြင်ရင် Dashboard သို့ ပြောင်းနိုင်သည်
        // window.location.href = 'dashboard.html'; 
    }
});
