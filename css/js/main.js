// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("theme-toggle");

// Check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

}


// =========================
// TOGGLE DARK MODE
// =========================

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        if (isDarkMode) {

            themeToggle.textContent = "☀️";

            localStorage.setItem("theme", "dark");

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem("theme", "light");

        }

    });

}


// =========================
// SIGN OUT
// =========================

function signOut() {

    localStorage.removeItem("loggedInUser");

    showToast(
        "You have been signed out",
        "success"
    );

    updateAuthNavigation();

}


// =========================================
// AUTH NAVIGATION
// =========================================

function updateAuthNavigation() {

    const authNavItem =
        document.getElementById("auth-nav-item");

    const authNavButton =
        document.getElementById("auth-nav-button");

    if (!authNavItem || !authNavButton) {
        return;
    }

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    if (loggedInUser) {

        // User is logged in

        authNavButton.textContent = "Sign Out";

        authNavButton.className = "signout-btn";

        authNavButton.onclick = function () {

            localStorage.removeItem("loggedInUser");

            showToast(
                "You have been signed out",
                "success"
            );

            updateAuthNavigation();

        };

    } else {

        // User is a guest

        authNavButton.textContent = "Sign In";

        authNavButton.className = "signin-nav-btn";

        authNavButton.onclick = function () {

            window.location.href = "signin.html";

        };

    }

}


// =========================================
// TOAST NOTIFICATION
// =========================================

function showToast(message, type = "success") {

    const existingToast =
        document.querySelector(".toast-message");

    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className =
        `toast-message toast-${type}`;


    const icon =
        type === "success" ? "✓" : "⚠";


    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span>${message}</span>
    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("toast-hide");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);

}


// =========================================
// INITIALIZE AUTH NAVIGATION
// =========================================

updateAuthNavigation();