import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const logoutBtn = document.getElementById('logout-btn');

    // Protect the route
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // If no user is signed in, redirect to the login page
            window.location.href = 'login.html';
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful, redirect to login page
            console.log('Signed out successfully');
            window.location.href = 'login.html';
        }).catch((error) => {
            // An error happened.
            console.error('Sign out error:', error);
        });
    });
});
