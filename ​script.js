// သင်ပေးထားသော Supabase Credentials များ
const supabaseUrl = 'https://okwkibbvaonqolcnnhjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rd2tpYmJ2YW9ucW9sY25uaGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NzQzNDIsImV4cCI6MjA3ODA1MDM0Mn0.wMENc8uiJFFC5lOYKrjZbump72us7hkaKH00DelAwrs';

// Supabase Client ကို တည်ဆောက်ခြင်း
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements များကို ရယူခြင်း
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const signupCard = document.getElementById('signup-card');
const loginCard = document.getElementById('login-card');
const tabButtons = document.querySelectorAll('.tab-btn');


// ===================================
// Tab Switching Logic (Signup / Login)
// ===================================

function switchTab(showCard, hideCard, activeBtn, inactiveBtn) {
    hideCard.classList.add('hidden');
    showCard.classList.remove('hidden');
    inactiveBtn.classList.remove('active');
    activeBtn.classList.add('active');
}

showSignupBtn.addEventListener('click', () => {
    switchTab(signupCard, loginCard, showSignupBtn, showLoginBtn);
});

showLoginBtn.addEventListener('click', () => {
    switchTab(loginCard, signupCard, showLoginBtn, showSignupBtn);
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

    // Password တူ/မတူ စစ်ဆေးခြင်း
    if (password !== confirmPassword) {
        alert('Password နှင့် Confirm Password မတူပါ! ပြန်စစ်ဆေးပေးပါ။');
        return;
    }

    // Supabase Auth ဖြင့် စာရင်းသွင်းခြင်း
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name // Supabase ထဲမှာ full_name ကို သိမ်းဆည်းရန်
            }
        }
    });

    if (error) {
        console.error('Sign Up Error:', error.message);
        alert('စာရင်းသွင်းရာတွင် အဆင်မပြေပါ: ' + error.message);
    } else if (data.user) {
        // အောင်မြင်ပါက
        console.log('Sign Up Success:', data);
        alert('စာရင်းသွင်းခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးပြု၍ သင့် Email ကို စစ်ဆေးပြီး အတည်ပြုပါ။');
        signupForm.reset();
        // အတည်ပြုပြီးသားဖြစ်အောင် login tab ကို ပြောင်းပေးနိုင်သည်
        showLoginBtn.click();
    }
});


// ===================================
// 2. LOGIN Logic (Supabase Auth)
// ===================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Supabase Auth ဖြင့် ဝင်ရောက်ခြင်း
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error('Login Error:', error.message);
        alert('Login ဝင်ရာတွင် အဆင်မပြေပါ: ' + error.message);
    } else if (data.user) {
        // Login အောင်မြင်ပါက
        console.log('Login Success:', data);
        alert('Login အောင်မြင်ပါပြီ! Welcome, ' + data.user.email);
        loginForm.reset();
        // ဝင်ရောက်ပြီးပါက အခြားစာမျက်နှာသို့ ပြောင်းလဲရန် ဥပမာ
        // window.location.href = 'dashboard.html';
    }
});
