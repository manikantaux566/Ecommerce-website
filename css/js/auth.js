// =========================
// AUTHENTICATION
// =========================

let users = JSON.parse(localStorage.getItem("users")) || [];


// =========================
// SIGN UP
// =========================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document
            .getElementById("signup-name")
            .value
            .trim();

        const email = document
            .getElementById("signup-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("signup-password")
            .value;

        const message =
            document.getElementById("signup-message");


        // Check if account already exists

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            return;

        }


        // Create new user

        const newUser = {
            name: name,
            email: email,
            password: password
        };


        users.push(newUser);


        // Save users

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // Automatically sign in

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                name: name,
                email: email
            })
        );


        message.textContent =
            "Account created successfully!";


        // Redirect to homepage

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

    });

}


// =========================
// SIGN IN
// =========================

const signinForm = document.getElementById("signin-form");

if (signinForm) {

    signinForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("signin-email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("signin-password")
            .value;

        const message =
            document.getElementById("signin-message");


        // Find matching user

        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );


        // Invalid login

        if (!user) {

            message.textContent =
                "Invalid email or password.";

            return;

        }


        // Save logged-in user

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                name: user.name,
                email: user.email
            })
        );


        // Success message

        message.textContent =
            "Signed in successfully!";


        // Redirect to homepage

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

    });

}