function loadCategoryData() {
  const request = new XMLHttpRequest();
  request.open("GET", "/api/categories", true);

  // callback function when data is returned from the web server
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let categoryArray = JSON.parse(request.responseText);
      insertDynamicCategories(categoryArray);
    } else {
      console.error("Failed to load categories");
    }
  };

  request.onerror = function () {
    console.error("Error fetching categories");
  };
  request.send();
}

function insertDynamicCategories(categoryArray) {
  // Retrieve dynamic category data container via id
  const dynamicCategoriesList = document.getElementById(
    "dynamicCategoriesDataList"
  );

  // Start with a select box with a placeholder to build up the new HTML
  let categorySelect = `<select id="category" name="category" required>
  <option value="">Select a category</option>`;

  // Loop through the categoryArray elements
  for (let i = 0; i < categoryArray.length; i++) {
    // Build up the HTML option string for this category
    categorySelect += `
      <option value="${categoryArray[i].id}">${categoryArray[i].name}</option>
      `;
  }

  // Close the select box
  categorySelect += "</select>";

  // Update the innerHTML once, after building the complete HTML string
  dynamicCategoriesList.innerHTML = categorySelect;
}
