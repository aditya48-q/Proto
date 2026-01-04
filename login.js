import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();

    // Redirect if user is already logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = 'dashboard.html';
        }
    });

    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const errorMessage = document.getElementById('error-message');
    const loadingSpinner = document.getElementById('loading-spinner');
    const loginButton = document.getElementById('login-button');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // Show loading state
        errorMessage.textContent = '';
        loadingSpinner.style.display = 'block';
        loginButton.disabled = true;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                let message = 'An unknown error occurred.';

                if (errorCode === 'auth/user-not-found') {
                    message = 'No user found with this email.';
                } else if (errorCode === 'auth/wrong-password') {
                    message = 'Incorrect password. Please try again.';
                } else if (errorCode === 'auth/invalid-email') {
                    message = 'Please enter a valid email address.';
                }

                errorMessage.textContent = message;
            })
            .finally(() => {
                // Hide loading state
                loadingSpinner.style.display = 'none';
                loginButton.disabled = false;
            });
    });
});
