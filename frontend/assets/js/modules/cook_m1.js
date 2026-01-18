
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (!hamburger || !navLinks) {
        console.error("Navbar elements not found!");
        return;
    }
    
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});


const data = {
    cuts: `
        <h2>🩹 Cuts and Scrapes</h2>
        <p>1. Clean the wound with clean water and mild soap.</p>
        <p>2. Apply an antiseptic to prevent infection.</p>
        <p>3. Cover the wound with a sterile bandage.</p>
        <p>4. Change the bandage daily.</p> `
    , 
    burns: `
        <h2>🔥 Burns</h2>
        <p>1. Cool the burn under running cold water for 10-20 minutes.</p>
        <p>2. Do not apply ice, butter, or any ointments.</p>
        <p>3. Cover the burn with a clean, non-stick dressing.</p>
        <p>4. Seek medical help if the burn is severe or covers a large area.</p> `

};

function openModal(type) {
    const modal = document.getElementById('modal');
    const modalInfo = document.getElementById('modal-info');
    modalInfo.innerHTML = data[type];
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};