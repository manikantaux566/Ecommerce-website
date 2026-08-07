// Update cart badge

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cart-count").textContent = cart.length;