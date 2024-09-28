function loadProductData() {
  const request = new XMLHttpRequest();
  request.open("GET", "/api/products/join", true);

  // callback function when data is returned from the web server
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let productArray = JSON.parse(request.responseText);
      insertDynamicProducts(productArray);
    } else {
      console.error("Failed to load products");
    }
  };

  request.onerror = function () {
    console.error("Error fetching products");
  };
  request.send();
}

function insertDynamicProducts(productArray) {
  // Retrieve dynamic product data container via id
  const dynamicProductsList = document.getElementById(
    "dynamicProductsDataList"
  );
  console.log(productArray);

  // Start with an empty string to build up the new HTML
  let productContent = "<table><tr>";

  // Add headers for the table
  productContent += "<th></th>"; // Empty header for product image
  productContent += "<th>Product Name</th>";
  productContent += "<th>Product Description</th>";
  productContent += "<th>Sale Price</th>";
  productContent += "<th>Category</th>";
  productContent += "</tr><tr>"; // Start a new row

  // Loop through the productArray elements
  for (let i = 0; i < productArray.length; i++) {
    // Truncate product name and description
    const truncatedName = truncateText(productArray[i].name, 50);
    const truncatedDescription = truncateText(productArray[i].description, 50);

    // Build up the HTML string for this product
    productContent += `
      <td>
        <a href="../pages/edit-product.html?id=${productArray[i].id}">
          <img src='${productArray[i].picture}' width='100' height='100' alt='Product image of ${productArray[i].name}'>
          </a>
      </td>
      <td>
        <a href="../pages/edit-product.html?id=${productArray[i].id}">${truncatedName}</a>
      </td>
      <td>${truncatedDescription}</td>
      <td>$${productArray[i].price}</td>
      <td>${productArray[i].category_name}</td>
    `;

    // Close the current row and start a new one
    productContent += "</tr><tr>";
  }

  // Close the last row and the table
  productContent += "</tr></table>";

  // Update the innerHTML once, after building the complete HTML string
  dynamicProductsList.innerHTML = productContent;

  // Call the searchProducts function after rendering dynamic products
  searchProducts();
}

/**
 * Function to truncate text and add ellipses
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

// Function to search products
function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const productRows = document.querySelectorAll("#dynamicProductsDataList tr");

  // Loop through each row except the first one (which contains headers)
  for (let i = 1; i < productRows.length; i++) {
    const productName = productRows[i]
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();
    const productCategory = productRows[i]
      .querySelector("td:nth-child(5)")
      .textContent.toLowerCase();

    // Show the row if the search input matches either product name or category, otherwise hide it
    if (
      productName.includes(searchInput) ||
      productCategory.includes(searchInput)
    ) {
      productRows[i].style.display = "";
    } else {
      productRows[i].style.display = "none";
    }
  }
}

// Function to reset search
function resetSearch() {
  document.getElementById("searchInput").value = "";
  searchProducts();
}

function loadProductDetail() {
  var request = new XMLHttpRequest();

  var params = new URLSearchParams(location.search);
  var id = params.get("id");

  console.log("id" + id);
  let product;
  const urlLink = "/api/products/" + id;
  request.open("GET", urlLink, true);

  request.onload = function () {
    // retrieve response and store it
    product = JSON.parse(request.responseText);
    setProductDetail(product[0]);
  };
  request.onerror = function () {
    console.error("Error fetching products");
  };
  request.send();
}

function updateProductData() {
  let product = new Object(); // create an object to be sent over
  product.name = document.getElementById("name").value;
  product.description = document.getElementById("description").value;
  product.price = document.getElementById("price").value;
  product.category_id = document.getElementById("category").value;
  product.picture = document.getElementById("picture_address").value;

  var id = document.getElementById("id").value;

  var request = new XMLHttpRequest(); // new HttpRequest instance to send student data
  var urlLink = "/api/products/" + id;

  request.open("PUT", urlLink, true);
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {
    location.href = "/products";
  };
  request.onerror = function () {
    console.error("Error fetching products");
  };

  request.send(JSON.stringify(product)); // Convert the student object to string in 350N format to be send over
}

function setProductDetail(product) {
  document.getElementById("name").value = product.name;
  document.getElementById("description").value = product.description;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category_id;
  document.getElementById("picture_address").value = product.picture;
  document.getElementById("id").value = product.id;
  document.getElementById("deleteButton").setAttribute("restId", product.id);
}

function deleteProductData(item) {
  const id = item.getAttribute("restId");

  const request = new XMLHttpRequest();

  request.open("delete", "/api/products/" + id, true);

  request.onload = function () {
    location.href = "/products";
  };
  request.onerror = function () {
    console.error("Error fetching products");
  };
  request.send();
}
