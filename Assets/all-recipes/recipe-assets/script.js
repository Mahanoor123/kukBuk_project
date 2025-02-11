// ------------------Hero Secton-------------------//



let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
}
prev.onclick = () => {
    active = active <= 0 ? active : active - 1;
    runCarousel();
}
function runCarousel() {
    prev.style.display = (active == 0) ? 'none' : 'block';
    next.style.display = (active == count - 1) ? 'none' : 'block';


    let old_active = document.querySelector('.item.active');
    if(old_active) old_active.classList.remove('active');
    items[active].classList.add('active');

     leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
}
runCarousel();


// Set Text on a Circle
let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan =  document.createElement("span");
    newSpan.innerText = value;
    let rotateThisSpan = (360 / textCircle.length) * (key + 1);
    newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
    circle.appendChild(newSpan); 
});



// ------------------All Cards-------------------//


let allRecipes = [];
let filteredRecipes = [];
let currentPage = 1;
const itemsPerPage = 9;

// Fetch recipes from API
fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data.recipes;
    filteredRecipes = allRecipes;
    displayRecipesWithPagination();
  });

function displayRecipesWithPagination() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const recipesToDisplay = filteredRecipes.slice(start, end);

  displayRecipes(recipesToDisplay);
  updatePaginationButtons();
}

function displayRecipes(data) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe_card";
    card.innerHTML = `
      <div class="recipe_content">
        <h5>${recipe.name}</h5>
        <div class="stars">Rating: ${recipe.rating || '★★★★☆'}</div>
        <div class="chef">
          <img src="https://via.placeholder.com/40" alt="Chef">
          <span>Chef John Doe</span>
        </div>
        <button class="recipe_btn" onclick="viewRecipe(${recipe.id})">View Recipe</button>

      </div>
      <img src="${recipe.image}" alt="Recipe Image" class="recipe_img">
    `;

    recipesContainer.appendChild(card);
  });
}

function updatePaginationButtons() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "disabled" : "";
    button.disabled = i === currentPage;
    button.onclick = () => {
      currentPage = i;
      displayRecipesWithPagination();
    };

    paginationContainer.appendChild(button);
  }
}

function searchRecipes() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery)
  );
  currentPage = 1;
  displayRecipesWithPagination();
}

function filterRecipesByCuisine() {
  const cuisine = document.getElementById("cuisine").value.toLowerCase();
  filteredRecipes = cuisine
    ? allRecipes.filter((recipe) => recipe.cuisine && recipe.cuisine.toLowerCase() === cuisine)
    : allRecipes;
  currentPage = 1;
  displayRecipesWithPagination();
}

function viewRecipe(recipeId) {
  // Redirect to recipe-details.html page and pass the recipe ID via URL
  window.location.href = `details-recipe.html?id=${recipeId}`;
}
