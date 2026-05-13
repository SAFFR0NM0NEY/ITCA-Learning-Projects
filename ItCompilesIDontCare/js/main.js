// main.js

// Load and display products from JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error("Error loading products:", error));
});

function displayProducts(data) {
  const container = document.getElementById("products-container");

  data.forEach(category => {
    // Create category section
    const categorySection = document.createElement("section");
    categorySection.classList.add("category-section");

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categorySection.appendChild(categoryTitle);

    const productsGrid = document.createElement("div");
    productsGrid.classList.add("products-grid");

    // Loop through products in the category
    category.products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;

      const name = document.createElement("h3");
      name.textContent = product.name;

      const description = document.createElement("p");
      description.textContent = product.description;

      productCard.appendChild(img);
      productCard.appendChild(name);
      productCard.appendChild(description);

      productsGrid.appendChild(productCard);
    });

    categorySection.appendChild(productsGrid);
    container.appendChild(categorySection);
  });
}
