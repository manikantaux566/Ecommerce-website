let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

if(cartCount){

    cartCount.textContent = cart.reduce((total,item)=>{

        return total + item.quantity;

    },0);

}