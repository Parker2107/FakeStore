// URL for the FakeStore API
const API_URL = "https://fakestoreapi.com/products";

// Function to fetch products based on categories
async function fetchCategoryProducts(category) {
    try {
        const response = await fetch(`${API_URL}/category/${category}`);
        const products = await response.json();

        displayProducts(products, category);
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
            <button class="details-button" onclick="fetchDetails(productId)">View Details</button>
            <p class="description" id="desc-productId" style="display: none;"></p> <!-- Description container -->
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

function searchProducts() 
{
    const searchQuery = document.getElementById("searchbar").value.toLowerCase();
    const allProductCards = document.querySelectorAll(".product-card");
    
    allProductCards.forEach(card => 
    {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(searchQuery) ? "block" : "none";
    });
}

// Function to fetch product details
function fetchDetails(productId) {
    // URL for the specific product, using the productId to fetch the correct item
    const url = `https://fakestoreapi.com/products/${productId}`;
    
    // Fetch the product details
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Find the description container by productId and insert the description
            const descriptionElem = document.getElementById(`desc-${productId}`);
            descriptionElem.textContent = data.description;
            descriptionElem.style.display = 'block';  // Show the description
        })
        .catch(error => console.error('Error fetching product details:', error));
}

// Fetch user data from the FakeStore API
function fetchUserData() {
    fetch('https://fakestoreapi.com/users/1')
        .then(response => response.json())
        .then(data => displayUserInfo(data))
        .catch(error => console.error('Error fetching user data:', error));
}

// Display user information on the page
function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    
    userInfoDiv.innerHTML = `
        <div class="user-details">
            <label>Name:</label>
            <p>${user.name.firstname} ${user.name.lastname}</p>
        </div>
        <div class="user-details">
            <label>Username:</label>
            <p>${user.username}</p>
        </div>
        <div class="user-details">
            <label>Email:</label>
            <p>${user.email}</p>
        </div>
        <div class="user-details">
            <label>Phone:</label>
            <p>${user.phone}</p>
        </div>
        <div class="user-details">
            <label>Address:</label>
            <p>${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
        </div>
    `;
}

// Call the fetchUserData function when the page loads
window.onload = fetchUserData;
