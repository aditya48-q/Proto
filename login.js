import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const loadingSpinner = document.querySelector('.loading-spinner');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        errorMessage.textContent = '';
        loadingSpinner.style.display = 'block';
        loginButton.disabled = true;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                let message = "An unknown error occurred.";
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    message = "Invalid credentials. Please try again.";
                } else if (errorCode === 'auth/invalid-email') {
                    message = "Please enter a valid email address.";
                }
                errorMessage.textContent = message;
            })
            .finally(() => {
                loadingSpinner.style.display = 'none';
                loginButton.disabled = false;
            });
    });
});
