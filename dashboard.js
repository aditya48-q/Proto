import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');

    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location.href = 'login.html';
        }).catch((error) => {
            // An error happened.
            console.error('Logout Error:', error);
        });
    });

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            // Fetch user data from Firestore
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                document.getElementById('welcome-heading').textContent = `Welcome, ${userData.name}`;
                document.getElementById('user-name').textContent = userData.name;
                document.getElementById('user-branch').textContent = userData.branch;
                document.getElementById('user-email').textContent = userData.email;
                document.getElementById('user-role').textContent = userData.role;
            } else {
                console.log("No such document!");
            }

            // Fetch timetable data from Firestore
            const timetableGrid = document.getElementById('timetable-grid');
            const q = query(collection(db, "timetable"), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const timetableData = doc.data();
                timetableGrid.innerHTML = `
                    <div class="time-block card"><strong>Morning (7:00 – 9:00):</strong><br>${timetableData.morning}</div>
                    <div class="time-block card"><strong>Late Morning (10:00 – 14:00):</strong><br>${timetableData.lateMorning}</div>
                    <div class="time-block card"><strong>Afternoon (15:00 – 17:00):</strong><br>${timetableData.afternoon}</div>
                    <div class="time-block card"><strong>Evening (18:00 – 19:30):</strong><br>${timetableData.evening}</div>
                    <div class="time-block card"><strong>Night (20:00 – 21:00):</strong><br>${timetableData.night}</div>
                `;
            });

        } else {
            // User is signed out
            window.location.href = 'login.html';
        }
    });
});
