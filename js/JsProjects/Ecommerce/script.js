document.addEventListener("DOMContentLoaded", () => {

  const products = [
    {id: 1 , name: "Poroduct 1" , price: 29.99},
    {id: 2 , name: "Poroduct 2" , price: 9.99},
    {id: 13, name: "Poroduct 3" , price: 19.99},
  ]

  const cart = []

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage  = document.getElementById("empty-cart");
  const cartTotalMessage  = document.getElementById("cart-total");
  const totelPrice = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");


  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });


  productList.addEventListener("click", (e) => {
    if(e.target.tagName === 'BUTTON') {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product)
    }
  });


  function addToCart(product){
    cart.push(product) ;
    renderCart();
  }

  function renderCart(){
    cartItems.innerText = "";
    
    let total = 0; // Renamed to avoid confusion with the DOM element
    
    if(cart.length){
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      
      cart.forEach((item) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
      });
      
      // Update price display AFTER the loop, with correct property name
      totelPrice.textContent = `$${total.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden"); // Add this line to hide total section
      totelPrice.textContent = "$0.00";
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0 ;
    alert("checkout success");
    renderCart();
  })


});

