document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    let loadingSpinner = document.querySelector('.loading-spinner');
    if (!loadingSpinner) {
        loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.style.display = 'none';
        loginForm.appendChild(loadingSpinner);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // --- HACKATHON DEMO AUTHENTICATION ---
        const DEMO_EMAIL = 'hellfirehackers@gmail.com';
        const DEMO_PASSWORD = 'H112BCE';

        errorMessage.textContent = '';
        loadingSpinner.style.display = 'block';
        loginButton.disabled = true;

        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                localStorage.setItem('userLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid credentials. Please try again.';
            }

            loadingSpinner.style.display = 'none';
            loginButton.disabled = false;
        }, 1000);
    });
});
