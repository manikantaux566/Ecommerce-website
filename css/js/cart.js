// =========================
// GET CART FROM LOCAL STORAGE
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// GET PAGE ELEMENTS
// =========================

const cartContainer = document.getElementById("cart-container");
const cartSummary = document.getElementById("cart-summary");
const cartCount = document.getElementById("cart-count");


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    if (cartCount) {

        cartCount.textContent = cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

    }

}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(id) {

    const item = cart.find(product => product.id === id);

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

    const item = cart.find(product => product.id === id);

    if (item) {

        if (item.quantity > 1) {

            item.quantity--;

        } else {

            cart = cart.filter(product => product.id !== id);

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

    cart = cart.filter(product => product.id !== id);

    saveCart();

    displayCart();

    updateCartCount();

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
                        ${item.description}
                    </p>

                </div>


                <!-- Price, Quantity and Remove -->

                <div class="cart-item-actions">

                    <p class="cart-price">
                        ₹${item.price.toLocaleString()}
                    </p>


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
    // CALCULATE TOTAL
    // =========================

    const total = cart.reduce((sum, item) => {

        return sum + (item.price * item.quantity);

    }, 0);


    // =========================
    // DISPLAY TOTAL
    // =========================

    cartSummary.innerHTML = `

        <div class="cart-total">

            <h2>
                Total: ₹${total.toLocaleString()}
            </h2>

        </div>

    `;

}


// =========================
// RUN WHEN PAGE LOADS
// =========================

displayCart();

updateCartCount();

/// =========================
// CHECKOUT AUTHENTICATION
// =========================

const checkoutButton = document.getElementById("checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

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

                window.location.href = "signin.html";

            }, 1000);

            return;

        }


        // Authenticated user

        window.location.href = "checkout.html";

    });

}