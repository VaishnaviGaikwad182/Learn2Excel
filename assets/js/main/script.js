// Main script file for Learn2Excel
// Navigation and UI functionality

// Hamburger menu functionality
function toggleMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        navLinks.classList.toggle("active");
    }
}

// Add event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }
});
