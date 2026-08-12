// =========================
// DARK MODE
// =========================

const themeToggle =
    document.getElementById("theme-toggle");

const savedTheme =
    localStorage.getItem("theme");

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

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    });

}


// =========================================
// SIGN OUT
// =========================================

function signOut() {

    localStorage.removeItem("loggedInUser");

    showToast(
        "You have been signed out",
        "success"
    );

    updateAuthNavigation();

    updateCartCount();

}


// =========================================
// AUTH NAVIGATION
// =========================================

function updateAuthNavigation() {

    const authNavItem =
        document.getElementById("auth-nav-item");

    const authNavButton =
        document.getElementById("auth-nav-button");

    const profileNavItem =
        document.getElementById("profile-nav-item");


    const loggedInUser =
        localStorage.getItem("loggedInUser");


    // =========================
    // USER LOGGED IN
    // =========================

    if (loggedInUser) {

        // Show Profile

        if (profileNavItem) {

            profileNavItem.style.display =
                "list-item";

        }


        // Sign Out button

        if (authNavItem) {

            authNavItem.style.display =
                "list-item";

        }


        if (authNavButton) {

            authNavButton.textContent =
                "Sign Out";

            authNavButton.className =
                "signout-btn";

            authNavButton.onclick =
                function () {

                    signOut();

                };

        }

    }


    // =========================
    // USER NOT LOGGED IN
    // =========================

    else {

        // Hide Profile

        if (profileNavItem) {

            profileNavItem.style.display =
                "none";

        }


        // Show Sign In

        if (authNavItem) {

            authNavItem.style.display =
                "list-item";

        }


        if (authNavButton) {

            authNavButton.textContent =
                "Sign In";

            authNavButton.className =
                "signin-nav-btn";

            authNavButton.onclick =
                function () {

                    window.location.href =
                        "signin.html";

                };

        }

    }

}


// =========================================
// TOAST NOTIFICATION
// =========================================

function showToast(
    message,
    type = "success"
) {

    const existingToast =
        document.querySelector(
            ".toast-message"
        );


    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement("div");


    toast.className =
        `toast-message toast-${type}`;


    const icon =
        type === "success"
            ? "✓"
            : "⚠";


    toast.innerHTML = `
        <span class="toast-icon">
            ${icon}
        </span>

        <span>
            ${message}
        </span>
    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add(
            "toast-hide"
        );


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}


// =========================================
// GLOBAL CART COUNT
// =========================================

function getCartStorageKey() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    if (!loggedInUser) {

        return "electromart_guest_cart";

    }


    return "electromart_cart_" +
        encodeURIComponent(loggedInUser);

}


function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    if (!cartCount) {
        return;
    }


    const cartKey =
        getCartStorageKey();


    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];


    const totalItems =
        cart.reduce(
            (total, item) =>
                total +
                (item.quantity || 1),
            0
        );


    cartCount.textContent =
        totalItems;


    if (totalItems > 0) {

        cartCount.style.display =
            "inline-flex";

    } else {

        cartCount.style.display =
            "none";

    }

}


// =========================================
// INITIALIZE
// =========================================

updateAuthNavigation();

updateCartCount();