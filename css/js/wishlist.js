// =========================
// LOAD WISHLIST
// =========================

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// =========================
// GET WISHLIST CONTAINER
// =========================

const wishlistContainer =
    document.getElementById("wishlist-container");


// =========================
// DISPLAY WISHLIST
// =========================

function displayWishlist() {

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


    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

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
// REMOVE FROM WISHLIST
// =========================

function removeFromWishlist(id) {

    wishlist = wishlist.filter(
        product => product.id !== id
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();

}


// =========================
// INITIALIZE WISHLIST
// =========================

displayWishlist();