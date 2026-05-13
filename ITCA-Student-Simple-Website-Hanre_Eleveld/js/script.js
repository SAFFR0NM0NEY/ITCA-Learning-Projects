fetch("data/Product.xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const products = xml.getElementsByTagName("Item");

    let output = "";
    for (let product of products) {
      const name = product.getElementsByTagName("Name")[0].textContent;
      const price = product.getElementsByTagName("Price")[0].textContent;
      const image = product.getElementsByTagName("Image")[0].textContent;
      const description = product.getElementsByTagName("Description")[0].textContent;

      output += `
        <div class="product-card">
          <img src="${image}" alt="${name}" width="20%">
          <h3>${name}</h3>
          <p>Price: R${price}</p>
          <p>Description: ${description}</p>
          <div class="buttonwrapper"><button class="addingtocart" onclick="addToCart('${name}', ${price})">Add to Cart</button></div>
        </div>`;
    }
    document.getElementById("product-list").innerHTML = output;
  });

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

