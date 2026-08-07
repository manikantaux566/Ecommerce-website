const container=document.getElementById("product-container");

products.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price.toLocaleString()}</p>

<button>Add to Cart</button>

</div>

`;

});