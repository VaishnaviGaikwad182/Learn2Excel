console.log("SIGNUP.JS LOADED"); // proof line

document
    .getElementById("signupForm")
    .addEventListener("submit", signupUser);

async function signupUser(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        console.log("BACKEND RESPONSE:", data);

        if (res.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.msg || "Signup failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
}
