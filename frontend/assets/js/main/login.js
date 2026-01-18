console.log("LOGIN.JS LOADED"); // proof line

document.getElementById("loginForm").addEventListener("submit", loginUser);

async function loginUser(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("BACKEND RESPONSE:", data);

        if (res.ok) {
            const user = {
                id: data.user.id,
                fullName:
                    data.user.fullName ||
                    data.user.name ||
                    data.user.username ||
                    "User",
                email: data.user.email   
            };

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));

            alert("Welcome " + user.fullName);
            window.location.href = "../../index.html";
        } else {
            alert(data.msg || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
}
