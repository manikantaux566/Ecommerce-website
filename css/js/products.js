// Get the product container
const productContainer = document.getElementById("product-container");

// Load cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = cart.reduce((total, item) => {

            return total + item.quantity;

        }, 0);

    }

}

// Display all products
function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="rating">${product.rating}</p>

            <p class="description">${product.description}</p>

            <h4>₹${product.price.toLocaleString()}</h4>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;

    });

}

// Temporary function
// Add product to cart
function addToCart(id) {

    // Find the product using its ID
    const product = products.find(item => item.id === id);

    // Check whether the product is already in the cart
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        // Product already exists → increase quantity
        existingProduct.quantity++;

    } else {

        // Product doesn't exist → add it to cart
        cart.push({
            ...product,
            quantity: 1
        });

    }

    // Save updated cart in Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart number
    updateCartCount();

    // Tell the user
    alert(`${product.name} added to cart!`);
}

displayProducts();
updateCartCount();