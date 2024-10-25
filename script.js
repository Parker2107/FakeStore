// URL for the FakeStore API
const API_URL = "https://fakestoreapi.com/products";

// Function to fetch products based on categories
async function fetchCategoryProducts(category) {
    try {
        const response = await fetch(`${API_URL}/category/${category}`);
        const products = await response.json();

        // Limit to 4 products per category
        const limitedProducts = products.slice(0, 4);
        displayProducts(limitedProducts, category);
    } catch (error) {
        console.error("Error fetching category products:", error);
    }
}

// Function to display products in the products container
function displayProducts(products, category) {
    const container = document.getElementById("products-container");

    // Create a section for each category
    const categorySection = document.createElement("div");
    categorySection.className = "category-section";

    // Category Title
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySection.appendChild(categoryTitle);

    // Create a div to hold category products in a grid
    const categoryProductsContainer = document.createElement("div");
    categoryProductsContainer.className = "category-products";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img class="productimg" src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;

        categoryProductsContainer.appendChild(productCard);
    });

    // Add the products container to the category section
    categorySection.appendChild(categoryProductsContainer);
    container.appendChild(categorySection);
}

// Function to fetch and display all categories
function loadCategories() {
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    categories.forEach(category => fetchCategoryProducts(category));
}

// Initialize slideshow and load categories on page load
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();

  // Basic slideshow functionality (auto-scroll)
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  setInterval(() => {
      slides.forEach((slide, index) => {
          slide.style.display = index === currentIndex ? "block" : "none";
      });
      currentIndex = (currentIndex + 1) % slides.length;
  }, 3000);
});