// =========================
// CHECK AUTHENTICATION
// =========================

const loggedInUser =
    localStorage.getItem("loggedInUser");

if (!loggedInUser) {

    if (typeof showToast === "function") {

        showToast(
            "Please sign in to continue",
            "warning"
        );

    }

    setTimeout(() => {

        window.location.href = "signin.html";

    }, 1000);

}


// =========================
// GET CURRENT USER CART KEY
// =========================

function getCheckoutCartKey() {

    const user =
        localStorage.getItem("loggedInUser");

    if (!user) {
        return "electromart_guest_cart";
    }

    return "electromart_cart_" +
        encodeURIComponent(user);

}


// =========================
// LOAD CART
// =========================

let cart = JSON.parse(
    localStorage.getItem(
        getCheckoutCartKey()
    )
) || [];


// =========================
// SHOW USER
// =========================

const welcomeUser =
    document.getElementById("welcome-user");

if (welcomeUser && loggedInUser) {

    let displayName = loggedInUser;

    try {

        const parsedUser =
            JSON.parse(loggedInUser);

        displayName =
            parsedUser.name ||
            parsedUser.email ||
            loggedInUser;

    } catch (error) {

        displayName = loggedInUser;

    }

    welcomeUser.textContent =
        `Welcome, ${displayName}`;

}


// =========================
// CALCULATE SUBTOTAL
// =========================

function calculateSubtotal() {

    return cart.reduce(
        (total, item) => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            return total +
                (price * quantity);

        },
        0
    );

}


// =========================
// CALCULATE DISCOUNT
// =========================

function calculateDiscount(total) {

    let discountPercent = 0;

    if (total >= 80000) {

        discountPercent = 25;

    } else if (total >= 60000) {

        discountPercent = 20;

    } else if (total >= 40000) {

        discountPercent = 15;

    } else if (total >= 20000) {

        discountPercent = 10;

    } else if (total >= 10000) {

        discountPercent = 5;

    }

    return Math.round(
        total * discountPercent / 100
    );

}


// =========================
// DISPLAY ORDER SUMMARY
// =========================

function displayOrderSummary() {

    const subtotal =
        calculateSubtotal();

    const discount =
        calculateDiscount(subtotal);

    const finalTotal =
        subtotal - discount;


    const subtotalElement =
        document.getElementById(
            "checkout-subtotal"
        );

    const discountElement =
        document.getElementById(
            "checkout-discount"
        );

    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal.toLocaleString()}`;

    }


    if (discountElement) {

        discountElement.textContent =
            `-₹${discount.toLocaleString()}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `₹${finalTotal.toLocaleString()}`;

    }

}


// =========================
// INITIALIZE SUMMARY
// =========================

displayOrderSummary();


// =========================
// PLACE ORDER
// =========================

const checkoutForm =
    document.getElementById(
        "checkout-form"
    );

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Check cart

            if (cart.length === 0) {

                if (typeof showToast === "function") {

                    showToast(
                        "Your cart is empty",
                        "warning"
                    );

                }

                return;

            }


            // Calculate final amount

            const subtotal =
                calculateSubtotal();

            const discount =
                calculateDiscount(subtotal);

            const finalTotal =
                subtotal - discount;


            // =========================
            // CREATE ORDER
            // =========================

            const order = {

                id:
                    "EM" +
                    Date.now(),

                items: cart,

                subtotal:
                    subtotal,

                discount:
                    discount,

                total:
                    finalTotal,

                payment:
                    document.getElementById(
                        "payment"
                    ).value,

                name:
                    document.getElementById(
                        "name"
                    ).value,

                address:
                    document.getElementById(
                        "address"
                    ).value,

                date:
                    new Date().toLocaleString(),

                status:
                    "Order Placed"

            };


            // =========================
            // SAVE ORDER
            // =========================

            const ordersKey =
                "electromart_orders_" +
                encodeURIComponent(
                    loggedInUser
                );


            const existingOrders =
                JSON.parse(
                    localStorage.getItem(
                        ordersKey
                    )
                ) || [];


            existingOrders.push(order);


            localStorage.setItem(
                ordersKey,
                JSON.stringify(
                    existingOrders
                )
            );


            // =========================
            // CLEAR CURRENT USER CART
            // =========================

            localStorage.removeItem(
                getCheckoutCartKey()
            );


            // =========================
            // SUCCESS MESSAGE
            // =========================

            if (typeof showToast === "function") {

                showToast(
                    "Order placed successfully!",
                    "success"
                );

            }


            // =========================
            // REDIRECT TO ORDERS
            // =========================

            setTimeout(() => {

                window.location.href =
                    "orders.html";

            }, 1500);

        }
    );

}