document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const formWrappers = document.querySelectorAll('.form-wrapper');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // လက်ရှိ active ဖြစ်နေတဲ့ Tab နဲ့ Form ကို ဖြုတ်ပါ
            document.querySelector('.tab-button.active').classList.remove('active');
            document.querySelector('.form-wrapper.active').classList.remove('active');

            // နှိပ်လိုက်တဲ့ Tab ကို active လုပ်ပါ
            this.classList.add('active');

            // သက်ဆိုင်ရာ Form ကို ရှာပြီး active လုပ်ပါ
            const targetFormId = this.getAttribute('data-form') + 'Form';
            document.getElementById(targetFormId).classList.add('active');
        });
    });

    // စစချင်းမှာ Login Form ကို စပြဖို့
    document.getElementById('loginForm').classList.add('active');
});
