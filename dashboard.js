// HTML elements များကို ရယူခြင်း
const welcomeMessage = document.getElementById('welcomeMessage');
const userEmailElement = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// ====================================
// စာမျက်နှာ စတင်ဖွင့်စဉ် လုပ်ဆောင်ရန် Function
// ====================================
function initDashboard() {
    // 1. User Token ကို Local Storage မှ စစ်ဆေးခြင်း
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
        // Token မရှိရင် Login Page ကို ပြန်ပို့ခြင်း (Protected Route)
        alert('Access Denied. ကျေးဇူးပြု၍ Login ဝင်ပါ။');
        window.location.href = 'index.html'; // Login Page လိပ်စာ
        return;
    }

    // 2. Token ရှိရင် User Info များကို Backend မှ Fetch လုပ်ခြင်း (တကယ့်စနစ်)
    // ⚠️ ဤနေရာတွင် Hardcoded ဖြင့်သာ ဥပမာပြထားပါသည်။
    // တကယ်တမ်းမှာ Server ကို ခေါ်ပြီး Token ကို သုံးကာ User ရဲ့ Email, Username ကို ပြန်တောင်းရပါမည်။
    
    const decodedUser = {
        username: 'Reborn_Phoenix', // ဤအချက်အလက်ကို Server မှ ရရပါမည်
        email: 'user@reborn.com' 
    };

    // 3. UI တွင် အချက်အလက်များ ပြသခြင်း
    welcomeMessage.textContent = `Hello, ${decodedUser.username}!`;
    userEmailElement.textContent = decodedUser.email;
}

// ====================================
// Log Out လုပ်ဆောင်ချက်
// ====================================
logoutBtn.addEventListener('click', () => {
    // 1. Local Storage မှ Token ကို ဖျက်ပစ်ခြင်း
    localStorage.removeItem('userToken');
    
    // 2. Login Page သို့ ပြန်ပို့ခြင်း
    alert('Log Out အောင်မြင်ပါသည်။');
    window.location.href = 'index.html';
});


// စာမျက်နှာ စဖွင့်သည်နှင့် Function ကို စတင်ခေါ်ယူခြင်း
document.addEventListener('DOMContentLoaded', initDashboard);

// ⚠️ သတိပြုရန်:
// အဆင့် 1 ရဲ့ 'script.js' ထဲက Login အောင်မြင်ရင် Token ကို သိမ်းတဲ့နေရာမှာ
// localStorage.setItem('userToken', data.token); ကို ထည့်ပေးထားဖို့ လိုအပ်ပါမယ်။
// ဥပမာ Token: { token: "user_session_token_123" }
