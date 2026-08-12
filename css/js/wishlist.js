// =========================
// GET CURRENT USER WISHLIST KEY
// =========================

function getWishlistKey() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");

    // Guest wishlist
    if (!loggedInUser) {
        return "electromart_guest_wishlist";
    }

    // User-specific wishlist
    return "electromart_wishlist_" +
        encodeURIComponent(loggedInUser);
}


// =========================
// LOAD WISHLIST
// =========================

let wishlist = JSON.parse(
    localStorage.getItem(
        getWishlistKey()
    )
) || [];


// =========================
// GET WISHLIST CONTAINER
// =========================

const wishlistContainer =
    document.getElementById("wishlist-container");


// =========================
// GET CURRENT USER CART KEY
// =========================

function getWishlistCartKey() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        return "electromart_guest_cart";
    }

    return "electromart_cart_" +
        encodeURIComponent(loggedInUser);
}


// =========================
// LOAD CART
// =========================

let cart = JSON.parse(
    localStorage.getItem(
        getWishlistCartKey()
    )
) || [];


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent =
            cart.reduce((total, item) => {

                return total + item.quantity;

            }, 0);

    }

}


// =========================
// DISPLAY WISHLIST
// =========================

function displayWishlist() {

    if (!wishlistContainer) {
        return;
    }


    // Empty wishlist

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your wishlist is empty
                </h2>

                <p>
                    Save products you love and find them here later.
                </p>

                <a href="products.html">
                    Explore Products
                </a>

            </div>

        `;

        return;
    }


    wishlistContainer.innerHTML = "";


    // Display wishlist products

    wishlist.forEach(product => {

        // Safe prices

        const price =
            Number(product.price) || 0;

        const originalPrice =
            Number(product.originalPrice) || price;


        // Calculate discount

        const discount =
            originalPrice > price
                ? Math.round(
                    (
                        (originalPrice - price) /
                        originalPrice
                    ) * 100
                )
                : 0;


        wishlistContainer.innerHTML += `

            <div class="product-card">

                <!-- Product Image -->

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <!-- Product Name -->

                <h3>
                    ${product.name}
                </h3>


                <!-- Rating -->

                <div class="rating">

                    <span class="rating-badge">
                        ★ ${product.rating || "5"}
                    </span>

                    <span class="rating-text">
                        Excellent
                    </span>

                </div>


                <!-- Product Description -->

                <p class="description">
                    ${
                        product.description ||
                        "Premium quality electronic product."
                    }
                </p>


                <!-- Product Pricing -->

                <div class="product-pricing">

                    <strong class="sale-price">
                        ₹${price.toLocaleString()}
                    </strong>

                    ${
                        originalPrice > price
                        ? `
                            <del class="original-price">
                                ₹${originalPrice.toLocaleString()}
                            </del>

                            <span class="discount-badge">
                                ${discount}% OFF
                            </span>
                        `
                        : ""
                    }

                </div>


                <!-- Add To Cart -->

                <button
                    class="add-to-cart-btn"
                    onclick="addWishlistProductToCart(${product.id})"
                >
                    Add to Cart
                </button>


                <!-- Remove Wishlist -->

                <button
                    class="remove-wishlist-btn"
                    onclick="removeFromWishlist(${product.id})"
                >
                    Remove from Wishlist
                </button>

            </div>

        `;

    });

}


// =========================
// ADD WISHLIST PRODUCT TO CART
// =========================

function addWishlistProductToCart(id) {

    const product =
        wishlist.find(
            item => item.id === id
        );

    if (!product) {
        return;
    }


    // Check if product already exists

    const existingProduct =
        cart.find(
            item => item.id === id
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    // Save cart

    localStorage.setItem(
        getWishlistCartKey(),
        JSON.stringify(cart)
    );


    // Update cart count

    updateCartCount();


    // Success message

    if (typeof showToast === "function") {

        showToast(
            `${product.name} added to cart`,
            "success"
        );

    }

}


// =========================
// REMOVE FROM WISHLIST
// =========================

function removeFromWishlist(id) {

    const product =
        wishlist.find(
            item => item.id === id
        );


    wishlist =
        wishlist.filter(
            product => product.id !== id
        );


    // Save to CURRENT USER'S wishlist

    localStorage.setItem(
        getWishlistKey(),
        JSON.stringify(wishlist)
    );


    displayWishlist();


    // Toast message

    if (product && typeof showToast === "function") {

        showToast(
            `${product.name} removed from wishlist`,
            "success"
        );

    }

}


// =========================
// INITIALIZE WISHLIST
// =========================

displayWishlist();

updateCartCount();