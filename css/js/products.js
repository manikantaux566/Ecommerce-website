// =========================
// WISHLIST
// =========================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// =========================
// GET PRODUCT CONTAINER
// =========================

const productContainer = document.getElementById("product-container");


// =========================
// LOAD CART
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = cart.reduce((total, item) => {

            return total + item.quantity;

        }, 0);

    }

}


// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const isWishlisted = wishlist.some(
            item => item.id === product.id
        );

        productContainer.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <h3>
                    ${product.name}
                </h3>

                <p class="rating">
                    ${product.rating}
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <h4>
                    ₹${product.price.toLocaleString()}
                </h4>

                <button
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

                <button
                    class="wishlist-btn"
                    onclick="addToWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥ Saved" : "♡ Save to Wishlist"}
                </button>

            </div>

        `;

    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    const existingProduct = cart.find(
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
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(`${product.name} added to cart!`);

}


// =========================
// ADD TO WISHLIST
// =========================

function addToWishlist(id) {

    const product = products.find(
        item => item.id === id
    );

    const alreadySaved = wishlist.find(
        item => item.id === id
    );

    if (alreadySaved) {

        alert(`${product.name} is already in your wishlist!`);

        return;

    }

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayProducts();

    alert(`${product.name} added to wishlist!`);

}


// =========================
// INITIALIZE PAGE
// =========================

displayProducts();

updateCartCount();