// Main script for Learn2Excel
// Handles navbar auth state, dropdown, logout, hamburger

document.addEventListener("DOMContentLoaded", () => {
    checkAuthStatus();

    // Re-check auth when returning from another tab/page
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            checkAuthStatus();
        }
    });

    // Global click handler for dropdown
    document.addEventListener("click", (e) => {
        const dropdown = document.querySelector(".profile-dropdown");
        if (!dropdown) return;

        if (e.target.closest(".profile-trigger")) {
            dropdown.classList.toggle("active");
        } else {
            dropdown.classList.remove("active");
        }
    });

    // Hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    }
});

// ===========================
// AUTH FUNCTIONS
// ===========================

function checkAuthStatus() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user && user.id) {
        updateNavbarForLoggedInUser(user);
        return true;
    } else {
        updateNavbarForGuest();
        return false;
    }
}

function updateNavbarForLoggedInUser(user) {
    const authLinks = document.querySelector(".auth-links");
    if (!authLinks) return;

    const name = user.fullName || user.name || user.username || "User";
    const initial = name.charAt(0).toUpperCase();

    authLinks.innerHTML = `
        <div class="user-profile">
            <div class="profile-dropdown">
                <div class="profile-trigger">
                    <div class="profile-avatar">${initial}</div>
                </div>
                <div class="dropdown-menu">
                    <a href="/frontend/pages/profile/profile.html">My Profile</a>
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            </div>
        </div>
    `;

    // Attach logout handler
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
}

function updateNavbarForGuest() {
    const authLinks = document.querySelector(".auth-links");
    if (!authLinks) return;

    authLinks.innerHTML = `
        <a href="/frontend/pages/auth/login.html" class="login-link">Login</a>
        <a href="/frontend/pages/auth/signUp.html" class="signup-btn">Sign Up</a>
        <button class="hamburger">☰</button>
    `;

    // Reattach hamburger handler
    const hamburger = authLinks.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    }
}

function logout(e) {
    if (e) e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    updateNavbarForGuest();
    window.location.href = "/frontend/index.html";
}

function requireAuth() {
    if (!checkAuthStatus()) {
        alert("Please login to access this page");
        window.location.href = "/frontend/pages/auth/login.html";
        return false;
    }
    return true;
}
