document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');

    // Check if user is logged in
    if (localStorage.getItem('userLoggedIn') !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }

    logoutButton.addEventListener('click', () => {
        // Clear login status and redirect to login page
        localStorage.removeItem('userLoggedIn');
        window.location.href = 'login.html';
    });
});
