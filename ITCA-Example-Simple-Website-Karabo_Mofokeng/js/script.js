fetch("data/products.xml")
    .then(response => {
        if (!response.ok) throw new Error("Failed to fetch products.");
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const products = xml.getElementsByTagName("product");

        let output = "";
        for (let product of products) {
            const name = product.getElementsByTagName("name")[0].textContent;
            const price = parseFloat(product.getElementsByTagName("price")[0].textContent.replace("R", "")).toFixed(2);
            const image = product.getElementsByTagName("image")[0].textContent;

            // Create a product with a quantity selection dropdown
            output += `
        <div class="product">
          <img src="${image}" alt="${name}" width="150">
          <h3>${name}</h3>
          <p>Price: R${price}</p>
          <label for="quantity_${name}">Quantity:</label>
          <select id="quantity_${name}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button onclick="addToCart('${name}', ${price}, 'quantity_${name}')">Add to Cart</button>
        </div>
      `;
        }

        document.getElementById("product-list").innerHTML = output;
    })
    .catch(error => {
        console.error("Error loading products:", error);
        document.getElementById("product-list").innerHTML = "<p>Failed to load products. Please try again later.</p>";
    });

// Function to add product to cart with the correct quantity
function addToCart(name, price, qtyElementId) {
    const quantity = parseInt(document.getElementById(qtyElementId).value, 10); // Parse the quantity as a number
    if (quantity <= 0 || isNaN(quantity)) {
        alert('Please select a valid quantity.');
        return;
    }

    // Get the cart from localStorage, or initialize it if it's empty
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // If the product doesn't exist, add it with the selected quantity
        cart.push({ name, price, quantity });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Notify the user
    alert(`${name} x${quantity} added to cart`);
}

// Optional: Update the cart display (e.g., show cart contents in a shopping cart section)
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity; // Multiply price by quantity
    });

    cartTotal.textContent = `Total: R${total.toFixed(2)}`;
}
