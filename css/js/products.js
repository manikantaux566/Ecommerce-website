// =========================
// GET CURRENT USER WISHLIST KEY
// =========================

function getProductsWishlistKey() {

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
// WISHLIST
// =========================

let wishlist = JSON.parse(
    localStorage.getItem(
        getProductsWishlistKey()
    )
) || [];


// =========================
// GET PRODUCT CONTAINER
// =========================

const productContainer =
    document.getElementById("product-container");


// =========================
// GET SELECTED CATEGORY
// =========================

const urlParams =
    new URLSearchParams(window.location.search);

const selectedCategory =
    urlParams.get("category");


// =========================
// GET CURRENT USER CART
// =========================

function getProductsCartKey() {

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
        getProductsCartKey()
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
// GET FILTERED PRODUCTS
// =========================

function getFilteredProducts() {

    // No category = show everything

    if (!selectedCategory) {

        return products;

    }


    const category =
        selectedCategory.toLowerCase();


    return products.filter(product => {

        if (!product.category) {
            return false;
        }

        return product.category
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/-/g, "") ===
            category
                .replace(/\s+/g, "")
                .replace(/-/g, "");

    });

}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts() {

    if (!productContainer) {
        return;
    }


    productContainer.innerHTML = "";


    const filteredProducts =
        getFilteredProducts();


    // =========================
    // NO PRODUCTS FOUND
    // =========================

    if (filteredProducts.length === 0) {

        productContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    No products found
                </h2>

                <p>
                    We couldn't find products in this category.
                </p>

                <a href="products.html">
                    View All Products
                </a>

            </div>

        `;

        return;

    }


    // =========================
    // DISPLAY PRODUCTS
    // =========================

    filteredProducts.forEach(product => {

        const isWishlisted =
            wishlist.some(
                item => item.id === product.id
            );


        const price =
            Number(product.price) || 0;


        const originalPrice =
            Number(product.originalPrice) || price;


        const discount =
            originalPrice > 0
                ? Math.round(
                    (
                        (originalPrice - price) /
                        originalPrice
                    ) * 100
                )
                : 0;


        productContainer.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <h3>
                    ${product.name}
                </h3>


                <!-- RATING -->

                <div class="rating">

                    <span class="rating-badge">
                        ★ ${product.rating || "4.5"}
                    </span>

                    <span class="rating-text">
                        Excellent
                    </span>

                </div>


                <!-- DESCRIPTION -->

                <p class="description">
                    ${product.description || "Premium quality electronic product."}
                </p>


                <!-- PRICING -->

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


                <!-- ADD TO CART -->

                <button
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>


                <!-- WISHLIST -->

                <button
                    class="wishlist-btn"
                    onclick="addToWishlist(${product.id})"
                >
                    ${
                        isWishlisted
                            ? "♥ Saved"
                            : "♡ Save to Wishlist"
                    }
                </button>

            </div>

        `;

    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


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


    localStorage.setItem(
        getProductsCartKey(),
        JSON.stringify(cart)
    );


    updateCartCount();


    // =========================
    // SUCCESS MESSAGE
    // =========================

    if (typeof showToast === "function") {

        showToast(
            `${product.name} added to cart`,
            "success"
        );

    }

}


// =========================
// ADD TO WISHLIST
// =========================

function addToWishlist(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {
        return;
    }


    const alreadySaved =
        wishlist.find(
            item => item.id === id
        );


    if (alreadySaved) {

        if (typeof showToast === "function") {

            showToast(
                `${product.name} is already in your wishlist`,
                "warning"
            );

        }

        return;

    }


    wishlist.push(product);


    // Save to CURRENT USER'S wishlist

    localStorage.setItem(
        getProductsWishlistKey(),
        JSON.stringify(wishlist)
    );


    displayProducts();


    // =========================
    // SUCCESS MESSAGE
    // =========================

    if (typeof showToast === "function") {

        showToast(
            `${product.name} saved to wishlist`,
            "success"
        );

    }

}


// =========================
// INITIALIZE PAGE
// =========================

displayProducts();

updateCartCount();