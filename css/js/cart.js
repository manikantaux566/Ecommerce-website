// =========================
// GET CURRENT USER CART
// =========================

function getCartPageStorageKey() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        return "electromart_guest_cart";
    }

    return "electromart_cart_" +
        encodeURIComponent(loggedInUser);
}

let cart = JSON.parse(
    localStorage.getItem(
        getCartPageStorageKey()
    )
) || [];


// =========================
// GET PAGE ELEMENTS
// =========================

const cartContainer =
    document.getElementById("cart-container");

const cartSummary =
    document.getElementById("cart-summary");

const cartCount =
    document.getElementById("cart-count");


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    if (cartCount) {

        cartCount.textContent =
            cart.reduce((total, item) => {

                return total + item.quantity;

            }, 0);

    }

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        getCartPageStorageKey(),
        JSON.stringify(cart)
    );

}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(id) {

    const item =
        cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    saveCart();

    displayCart();

    updateCartCount();

}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(id) {

    const item =
        cart.find(product => product.id === id);

    if (item) {

        if (item.quantity > 1) {

            item.quantity--;

        } else {

            cart =
                cart.filter(
                    product => product.id !== id
                );

        }

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// =========================
// REMOVE PRODUCT
// =========================

function removeFromCart(id) {

    cart =
        cart.filter(
            product => product.id !== id
        );

    saveCart();

    displayCart();

    updateCartCount();

}


// =========================
// GET PROGRESS COLOR
// =========================

function getProgressColor(progress) {

    if (progress < 25) {
        return "#ef4444";
    }

    if (progress < 50) {
        return "#f97316";
    }

    if (progress < 75) {
        return "#eab308";
    }

    return "#22c55e";

}


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    // Check if cart is empty

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Add some products to your cart to see them here.
                </p>

                <a href="products.html">
                    Continue Shopping
                </a>

            </div>

        `;

        cartSummary.innerHTML = "";

        return;

    }


    // Clear previous cart contents

    cartContainer.innerHTML = "";


    // Display every cart item

    cart.forEach(item => {

        // =========================
        // GET LATEST PRODUCT DATA
        // =========================

        const latestProduct =
            typeof products !== "undefined"
                ? products.find(
                    product => product.id === item.id
                )
                : null;


        // Use latest description from data.js

        const productDescription =
            latestProduct?.description ||
            item.description ||
            "Premium quality electronic product.";


        cartContainer.innerHTML += `

            <div class="cart-item">

                <!-- Product Image -->

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <!-- Product Information -->

                <div class="cart-item-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${productDescription}
                    </p>

                </div>


                <!-- Price, Quantity and Remove -->

                <div class="cart-item-actions">

                    <div class="cart-price">

                        <span class="current-price">
                            ₹${(
                                item.price *
                                item.quantity
                            ).toLocaleString()}
                        </span>

                        <span class="original-price">
                            ₹${(
                                (item.originalPrice || item.price) *
                                item.quantity
                            ).toLocaleString()}
                        </span>

                    </div>


                    <!-- Quantity Controls -->

                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${item.id})"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${item.id})"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <!-- Remove Button -->

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    // =========================
    // CALCULATE SUBTOTAL
    // =========================

    const total =
        cart.reduce((sum, item) => {

            return sum +
                (item.price * item.quantity);

        }, 0);


    // =========================
    // DISCOUNT SYSTEM
    // =========================

    let discountPercent = 0;

    let previousThreshold = 0;

    let nextThreshold = 10000;


    // Below ₹10,000
    if (total < 10000) {

        discountPercent = 0;

        previousThreshold = 0;

        nextThreshold = 10000;

    }

    // ₹10,000 - ₹19,999
    else if (total < 20000) {

        discountPercent = 5;

        previousThreshold = 10000;

        nextThreshold = 20000;

    }

    // ₹20,000 - ₹39,999
    else if (total < 40000) {

        discountPercent = 10;

        previousThreshold = 20000;

        nextThreshold = 40000;

    }

    // ₹40,000 - ₹59,999
    else if (total < 60000) {

        discountPercent = 15;

        previousThreshold = 40000;

        nextThreshold = 60000;

    }

    // ₹60,000 - ₹79,999
    else if (total < 80000) {

        discountPercent = 20;

        previousThreshold = 60000;

        nextThreshold = 80000;

    }

    // ₹80,000+
    else {

        discountPercent = 25;

        previousThreshold = 80000;

        nextThreshold = null;

    }


    // =========================
    // CALCULATE DISCOUNT
    // =========================

    const discountAmount =
        Math.round(
            total * discountPercent / 100
        );

    const finalTotal =
        total - discountAmount;


    // =========================
    // DISCOUNT MESSAGE
    // =========================

    let discountMessage = "";


    // =========================
    // NO DISCOUNT YET
    // =========================

    if (discountPercent === 0) {

        const remaining =
            nextThreshold - total;

        const progress =
            Math.min(
                (total / nextThreshold) * 100,
                100
            );

        const progressColor =
            getProgressColor(progress);


        discountMessage = `

            <div class="cart-savings-box">

                <div class="savings-header">

                    <strong>
                        🔥 Unlock 5% OFF
                    </strong>

                    <span>
                        Add ₹${remaining.toLocaleString()} more
                    </span>

                </div>


                <div class="discount-progress">

                    <div
                        class="discount-progress-fill"
                        style="
                            width: ${progress}%;
                            background: ${progressColor};
                        "
                    ></div>

                </div>


                <p>
                    Add ₹${remaining.toLocaleString()}
                    more to unlock
                    <strong>5% OFF</strong>.
                </p>

            </div>

        `;

    }


    // =========================
    // DISCOUNT UNLOCKED
    // =========================

    else if (discountPercent < 25) {

        const remaining =
            nextThreshold - total;


        const progress =
            Math.min(
                (
                    (total - previousThreshold) /
                    (nextThreshold - previousThreshold)
                ) * 100,
                100
            );


        const progressColor =
            getProgressColor(progress);


        const nextDiscount =
            discountPercent + 5;


        discountMessage = `

            <div class="cart-savings-box unlocked">

                <div class="savings-header">

                    <strong>
                        🎉 ${discountPercent}% OFF Unlocked!
                    </strong>

                    <span>
                        ₹${discountAmount.toLocaleString()} saved
                    </span>

                </div>


                <div class="discount-progress">

                    <div
                        class="discount-progress-fill"
                        style="
                            width: ${progress}%;
                            background: ${progressColor};
                        "
                    ></div>

                </div>


                <p>
                    Add ₹${remaining.toLocaleString()}
                    more to unlock
                    <strong>${nextDiscount}% OFF</strong>.
                </p>

            </div>

        `;

    }


    // =========================
    // MAXIMUM DISCOUNT
    // =========================

    else {

        discountMessage = `

            <div class="cart-savings-box unlocked maximum">

                <div class="savings-header">

                    <strong>
                        🎉 Maximum 25% OFF Unlocked!
                    </strong>

                    <span>
                        ₹${discountAmount.toLocaleString()} saved
                    </span>

                </div>

                <p>
                    You've unlocked our maximum
                    available discount.
                </p>

            </div>

        `;

    }


    // =========================
    // FINAL CART SUMMARY
    // =========================

    cartSummary.innerHTML = `

        ${discountMessage}

        <div class="cart-total">

            <div class="price-breakdown">

                <div>

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ₹${total.toLocaleString()}
                    </strong>

                </div>


                ${
                    discountAmount > 0
                    ? `
                        <div class="discount-row">

                            <span>
                                Discount (${discountPercent}%)
                            </span>

                            <strong>
                                -₹${discountAmount.toLocaleString()}
                            </strong>

                        </div>
                    `
                    : ""
                }


                <div class="final-price">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹${finalTotal.toLocaleString()}
                    </strong>

                </div>

            </div>

        </div>

    `;

}


// =========================
// RUN WHEN PAGE LOADS
// =========================

displayCart();

updateCartCount();


// =========================
// CHECKOUT AUTHENTICATION
// =========================

const checkoutButton =
    document.getElementById("checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            // Check cart

            if (cart.length === 0) {

                showToast(
                    "Your cart is empty",
                    "warning"
                );

                return;

            }


            // Check authentication

            const loggedInUser =
                localStorage.getItem("loggedInUser");


            // Guest user

            if (!loggedInUser) {

                showToast(
                    "Please sign in to continue to checkout",
                    "warning"
                );

                setTimeout(() => {

                    window.location.href =
                        "signin.html";

                }, 1000);

                return;

            }


            // Authenticated user

            window.location.href =
                "checkout.html";

        }
    );

}