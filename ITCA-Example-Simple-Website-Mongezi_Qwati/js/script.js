// --- CART FUNCTIONALITY ---

/**
 * Adds a product to the cart in localStorage
 * @param {string} name - Product name
 * @param {number} price - Product price
 * @param {string} image - Product image path (optional, for future use)
 */
function addToCart(name, price, image) {
  // Retrieve existing cart or create new one
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price: Number(price), image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// --- PRODUCT DISPLAY FUNCTIONALITY ---

/**
 * Fetches products from XML, optionally filters them by category,
 * and displays them inside the container with given ID.
 * @param {string} xmlFile - Path to the products XML file
 * @param {string} targetId - ID of the HTML element to display products in
 * @param {string|null} categoryFilter - If provided, filters by category ("men" or "women")
 */
function fetchAndDisplay(xmlFile, targetId, categoryFilter = null) {
  fetch(xmlFile)
    .then(response => response.text())
    .then(data => {
      // Parse XML data
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const products = xml.getElementsByTagName("product");
      let output = "";

      // Build product cards
      for (let product of products) {
        const name = product.getElementsByTagName("name")[0]?.textContent;
        const price = product.getElementsByTagName("price")[0]?.textContent;
        const image = product.getElementsByTagName("image")[0]?.textContent;
        const category = product.getElementsByTagName("category")[0]?.textContent;

        // Only display if category matches (or if no filter)
        if (!categoryFilter || category === categoryFilter) {
          // Use JSON.stringify to safely pass name and price
          output += `
            <div class="product">
              <img src="${image}" alt="${name}" width="150">
              <h3>${name}</h3>
              <p>Price: R${price}</p>
              <button onclick='addToCart(${JSON.stringify(name)}, ${JSON.stringify(price)}, ${JSON.stringify(image)})'>Add to Cart</button>
            </div>`;
        }
      }

      // Display products in target container
      const container = document.getElementById(targetId);
      if (container) container.innerHTML = output;
    });
}

// --- INITIALIZE CORRECT PAGE ON LOAD ---

document.addEventListener("DOMContentLoaded", () => {
  // All Products page
  if (document.getElementById("product-list") && document.title.includes("Products") && !document.title.includes("Men") && !document.title.includes("Women")) {
    fetchAndDisplay("data/products.xml", "product-list");
  }
  // Men's Products page
  if (document.getElementById("product-list") && document.title.includes("Men")) {
    fetchAndDisplay("data/products.xml", "product-list", "men");
  }
  // Women's Products page
  if (document.getElementById("product-list") && document.title.includes("Women")) {
    fetchAndDisplay("data/products.xml", "product-list", "women");
  }
});
