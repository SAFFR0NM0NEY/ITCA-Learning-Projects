// Add product to cart and save to localStorage
function addToCart(product) {
  // Check if user info exists in localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    // Redirect to login page if not logged in
    alert("Please log in before adding items to your cart.");
    window.location.href = "login.html";  // path to your login page
    return;
  }

  // Confirm only once before adding to cart
  if (!confirm(`Do you want to add ${product.name} to the cart?`)) {
    return; // user canceled, stop here
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Attach event listeners to "Add to Cart" buttons on product pages
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const id = parseInt(card.dataset.id);
      const name = card.querySelector("h2").textContent;
      const priceText = card.querySelector("p").textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
      const image = card.querySelector("img").getAttribute("src");

      const product = { id, name, price, image };
      addToCart(product);
    });
  });
}

// Render cart on cart.html
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElement = document.createElement("div");
    itemElement.classList.add("product-card");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="product-img" />
      <div class="product-details">
        <h3>${item.name}</h3>
        <p>Price: R${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: R${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})" style="margin-top: 5px;">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  cartTotal.textContent = `Total: R${total.toFixed(2)}`;
}

// Remove item by ID
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(p => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Checkout function (for now, just clears cart)
function checkout() {
  if (confirm("Are you sure you want to checkout?")) {
    localStorage.removeItem("cart");
    alert("Thank you for your purchase!");
    window.location.href = "index.html";
  }
}

// Auto setup on load
window.addEventListener("DOMContentLoaded", () => {
  setupAddToCartButtons();
  displayCart();
});
