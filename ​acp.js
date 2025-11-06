// HTML elements များကို ရယူခြင်း
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupButton = document.getElementById('showSignup');
const showLoginButton = document.getElementById('showLogin');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');

// Form ကူးပြောင်းတဲ့ Function
function switchForm(showForm, hideForm) {
    hideForm.classList.remove('active-form');
    hideForm.classList.add('hidden-form');
    
    // Animation/Transition အတွက် အချိန်ယူပြီးမှ ပြောင်းပေးခြင်း
    setTimeout(() => {
        showForm.classList.remove('hidden-form');
        showForm.classList.add('active-form');
    }, 100);
}

// Signup ကိုပြောင်းရန်
showSignupButton.addEventListener('click', () => {
    loginMessage.textContent = ''; // မက်ဆေ့ချ်ကို ရှင်းခြင်း
    switchForm(signupForm, loginForm);
});

// Login ကိုပြောင်းရန်
showLoginButton.addEventListener('click', () => {
    signupMessage.textContent = ''; // မက်ဆေ့ချ်ကို ရှင်းခြင်း
    switchForm(loginForm, signupForm);
});


// ====================================
// Login လုပ်ဆောင်ချက်
// ====================================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Form က အလိုလို submit ဖြစ်တာကို တားဆီးခြင်း
    
    // User ရဲ့ အချက်အလက်များကို ရယူခြင်း
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // ⚠️ Backend မပါတဲ့အတွက်၊ ဒီနေရာမှာ အခြေခံ စစ်ဆေးမှုလေး လုပ်ပေးထားပါတယ် 
    // (အမှန်တကယ် Login လုပ်ဆောင်ချက်အတွက် Server Side Code လိုပါတယ်)
    if (email === 'test@reborn.com' && password === '123456') {
        loginMessage.textContent = '✅ Login အောင်မြင်ပါတယ်။ Welcome Back!';
        loginMessage.style.color = '#6dff77';
    } else {
        loginMessage.textContent = '❌ Email သို့မဟုတ် Password မှားယွင်းနေပါတယ်။';
        loginMessage.style.color = '#ff6d6d'; // အနီရောင် error
    }
    
    // Log In ပြီးနောက် Form ကို ရှင်းလင်းခြင်း (Optional)
    // loginForm.reset();
});


// ====================================
// Signup လုပ်ဆောင်ချက်
// ====================================
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Form က အလိုလို submit ဖြစ်တာကို တားဆီးခြင်း
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // ⚠️ Backend မပါတဲ့အတွက်၊ ဒီနေရာမှာ အောင်မြင်ကြောင်းသာ ပြသပေးထားပါတယ်
    // (အမှန်တကယ် User ကို Register လုပ်ဖို့ Server Side Code လိုပါတယ်)
    
    // User ရဲ့ အချက်အလက်တွေကို Console မှာ ပြသခြင်း
    console.log(`Signup Attempt: Username: ${username}, Email: ${email}, Password: ${password}`);
    
    signupMessage.textContent = `🎉 Signup အောင်မြင်ပါတယ်။ ${username} အနေနဲ့ Login ဝင်နိုင်ပါပြီ။`;
    signupMessage.style.color = '#6dff77';
    
    // Signup ပြီးနောက် Login Form ကို ပြန်ပြောင်းခြင်း
    setTimeout(() => {
        signupForm.reset();
        signupMessage.textContent = '';
        switchForm(loginForm, signupForm);
    }, 2000); // ၂ စက္ကန့်ကြာရင် Login ကို ပြန်ပြောင်းမယ်။
});
