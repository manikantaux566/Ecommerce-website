// =========================
// CHECK AUTHENTICATION
// =========================

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    showToast(
        "Please sign in to continue",
        "warning"
    );

    setTimeout(() => {

        window.location.href = "signin.html";

    }, 1000);

}


// =========================
// SHOW USER
// =========================

const welcomeUser =
    document.getElementById("welcome-user");

if (welcomeUser && loggedInUser) {

    welcomeUser.textContent =
        `Welcome, ${loggedInUser.name}`;

}


// =========================
// PLACE ORDER
// =========================

const checkoutForm =
    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Clear cart

            localStorage.removeItem("cart");


            // Success message

            showToast(
                "Order placed successfully!",
                "success"
            );


            // Return home

            setTimeout(() => {

                window.location.href = "index.html";

            }, 1500);

        }
    );

}