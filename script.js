// Basic navigation
function navigateTo(url) {
    window.location.href = url;
}

// Authentication handling
function toggleAuthMode(mode) {
    if (mode === 'register') {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('auth-title').innerText = "Tạo tài khoản mới";
    } else {
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('auth-title').innerText = "Đăng nhập tài khoản";
    }
}

function handleLogin(e, isAdmin) {
    e.preventDefault();
    if (isAdmin) {
        navigateTo('admin-dashboard.html');
    } else {
        navigateTo('dashboard.html');
    }
}

// Exam question interaction
function selectOption(qId, optId) {
    // Reset all options
    document.querySelectorAll('.opt-card').forEach(el => {
        el.classList.remove('active');
        el.classList.add('inactive');
        let chk = el.querySelector('.opt-chk');
        chk.innerHTML = '';
        chk.style.border = '2px solid var(--text-muted)';
        chk.style.backgroundColor = 'transparent';
        el.querySelector('span').classList.remove('text-red-dark');
        el.querySelector('span').classList.add('text-muted');
    });

    // Make target active
    let target = document.getElementById(optId);
    target.classList.remove('inactive');
    target.classList.add('active');

    let chk = target.querySelector('.opt-chk');
    chk.style.border = 'none';
    chk.style.backgroundColor = 'var(--ptit-red)';
    chk.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    let label = target.querySelector('span');
    label.classList.remove('text-muted');
    label.classList.add('text-red-dark');

    // Update Question box stat to 'answered'
    let qbox = document.getElementById('qbox-2');
    if (qbox) {
        qbox.classList.remove('unanswered');
        qbox.classList.add('answered');
    }
}
