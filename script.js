document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const getStartedBtn = document.querySelector('.cta-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Show the modal when 'Get Started' is clicked
    getStartedBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
    });

    // Hide the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Hide the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Handle registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Registered and signed in as:', user.email);
                authModal.style.display = 'none';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Registration error:', errorCode, errorMessage);
                alert(`Registration failed: ${errorMessage}`);
            });
    });

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('Signed in as:', user.email);
                authModal.style.display = 'none';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorCode, errorMessage);
                alert(`Login failed: ${errorMessage}`);
            });
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log('Signed out');
        }).catch((error) => {
            console.error('Sign out error:', error);
        });
    });

    // Listen for authentication state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            getStartedBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            // You can now fetch user-specific data from Firestore
        } else {
            // User is signed out
            getStartedBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    });

    // Scroll-based animation triggers
    function onScrollAnimate() {
        const problem = document.getElementById('problem');
        if (problem && isVisible(problem)) {
            problem.classList.add('visible');
        }
        document.querySelectorAll('.card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        document.querySelectorAll('.step').forEach(step => {
            if (isVisible(step)) {
                step.classList.add('visible');
            }
        });
        document.querySelectorAll('.recommendation-card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        document.querySelectorAll('.integration-card').forEach(card => {
            if (isVisible(card)) {
                card.classList.add('visible');
            }
        });
        const footer = document.querySelector('footer');
        if (footer && isVisible(footer)) {
            footer.classList.add('visible');
        }
    }

    function isVisible(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight - 60 &&
            rect.bottom > 60
        );
    }

    window.addEventListener('scroll', onScrollAnimate);
    window.addEventListener('load', onScrollAnimate);
});
