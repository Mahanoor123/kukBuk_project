let allRecipes = [];
let filteredRecipes = [];
let currentPage = 1;
const itemsPerPage = 9;

/******** Fetch recipes from API ********/

fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data.recipes;
    console.log(allRecipes);
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
    const recipesContainer = document.querySelector(".recipes_cards_display");
  recipesContainer.innerHTML = "";

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe_card";
    card.innerHTML = `
       <div class="recipe_content">
                        <h5>${recipe.name}</h5>
                        <div class="rating">
                        ${recipe.rating || "★★★★☆"}
                        </div>
                        <div class="chef">
                            <img src="https://via.placeholder.com/40" alt="Chef">
                            <span>John Doe</span>
                        </div>
                        <button class="recipe_btn" onclick="viewRecipe(${recipe.id})"><i class="fa-solid fa-arrow-right"></i> View Recipe</button>
                    </div>
                    <img src="${recipe.image}" class="recipe_img">`;

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
    ? allRecipes.filter(
        (recipe) => recipe.cuisine && recipe.cuisine.toLowerCase() === cuisine
      )
    : allRecipes;
  currentPage = 1;
  displayRecipesWithPagination();
}

function viewRecipe(recipeId) {
  // Redirect to recipe-details.html page and pass the recipe ID via URL
  window.location.href = `fullView.html?id=${recipeId}`;
}
