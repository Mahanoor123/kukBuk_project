import {
  auth,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  getDoc,
} from "../../../firebase/firebase-config.js";

onAuthStateChanged(auth, async (user) => {
  const loginBtn = document.querySelector(".login_btn");
  const userProfile = document.querySelector(".user_profile");
  const usernameElement = document.querySelector(".username");
  const userPic = document.querySelector(".user_pic");
  const userTag = document.querySelector(".user_tag");

  if (user) {
    console.log("User Logged in");

    if (loginBtn) loginBtn.style.display = "none";
    if (userProfile) userProfile.style.display = "block";

    const userRef = doc(db, "Users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      if (usernameElement) {
        usernameElement.textContent = userData.username || "Jane Doe";
        userTag.textContent = userData.category || "Masterrrr Chef";
      }

      if (userPic) {
        userPic.src =
          userData.profileImage || "../assets/logo&profiles/user.png";
        userPic.src = userData.profileImage || "/public-src/Assets/Homepage/assets/logo&profiles/user.png";
      }
    } else {
      if (usernameElement) {
        usernameElement.textContent = "Jane Doe";
      }
      if (userPic) {
        userPic.src = "/public-src/Assets/Homepage/assets/logo&profiles/user.png";
      }
    }
  } else {
    console.log("No user logged in");

    if (userProfile) userProfile.style.display = "none";
    if (loginBtn) loginBtn.style.display = "block";

    if (usernameElement) {
      usernameElement.textContent = "Guest";
    }
    if (userPic) {
      userPic.src = "/public-src/Assets/Homepage/assets/logo&profiles/user.png";
    }
  }
});

/***** User profile slider *****/

document.querySelector(".user_profile")?.addEventListener("click", () => {
  document.querySelector(".main_profile").style.right = "0";
});

document
  .querySelector(".main_profile .fa-close")
  ?.addEventListener("click", () => {
    document.querySelector(".main_profile").style.right = "-50vw";
  });

const userLogOut = async () => {
  try {
    await signOut(auth);
    alert("You have been logged out successfully!");
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
document.querySelector(".logout")?.addEventListener("click", userLogOut);


/**********************************************************/
/****** All Recipes Display with search and filter *********/
/**********************************************************/


let allRecipes = [];
let filteredRecipes = [];
let currentPage = 1;
const itemsPerPage = 6; 

// Fetch Recipes
fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data.recipes;
    filteredRecipes = allRecipes; 
    displayRecipesWithPagination();
  })
  .catch((error) => console.error("Error fetching recipes:", error));

// **Display Recipes with Pagination**
function displayRecipesWithPagination() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const recipesToDisplay = filteredRecipes.slice(start, end);

  displayRecipes(recipesToDisplay);
  updatePaginationButtons();
}

// **Display Recipes**
const displayRecipes = (recipes) => {
  const recipeContainer = document.querySelector(".recipes_cards_display");
  recipeContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe_card");

    recipeCard.innerHTML = `
       <div class="recipe_content">
            <h5>${recipe.name}</h5>
            <div class="rating">
                ${recipe.rating || "★★★★☆"}
            </div>
            <div class="recipe_head">
                <div class="rec_cuisine">${recipe.cuisine || "Unknown"} Cuisine</div>
                <div class="rec_category">${recipe.mealType || "Uncategorized"}</div>
            </div>
            <button class="recipe_btn" data-id="${recipe.id}">
                <i class="fa-solid fa-arrow-right"></i> View Recipe
            </button>
        </div>
        <img src="${recipe.image || '/default-image.jpg'}" class="recipe_img">
    `;
<<<<<<< HEAD
=======
=======
                        <h5>${recipe.name}</h5>
                        <div class="rating">
                        ${recipe.rating || "★★★★☆"}
                        </div>
                        <div class="chef" style="margin-top:  7px;">
                          <img src="/public-src/Assets/all-recipes/images/chef-pic12(1).png" alt="Chef">
                        <span>Sofie</span>
                        </div>
                        
                        <button class="recipe_btn"><a href="/public-src/Assets/all-recipes/html/fullview.html"
                                    style="color: white; text-decoration: none;">Comment here <i class="fa-solid fa-arrow-right"></i></a></button>
                    </div>
                    <img src="${recipe.image}" class="recipe_img">`;
>>>>>>> fe157ec10afa42179c341172d1621a3ff45e316e
>>>>>>> c2ce49a6cdb362bfcc6648208050c0dc0c72e7a4

    recipeContainer.appendChild(recipeCard);
  });

  // **Attach Click Event to View Buttons**
  document.querySelectorAll(".recipe_btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const recipeId = event.currentTarget.getAttribute("data-id");
      viewRecipe(recipeId);
    });
  });
};

// **View Recipe Function**
const viewRecipe = (recipeId) => {
  if (recipeId) {
    window.location.href = `/public-src/Assets/all-recipes/html/fullview.html?id=${recipeId}`;
  } else {
    console.error("Invalid Recipe ID");
  }
};

// **Pagination Buttons**
function updatePaginationButtons() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.toggle("active", i === currentPage);
    button.disabled = i === currentPage;
    button.onclick = () => {
      currentPage = i;
      displayRecipesWithPagination();
    };

    paginationContainer.appendChild(button);
  }
}

// **Search Recipes**
const searchRecipes = () => {
  const searchInput = document.querySelector("#searchInput").value.toLowerCase();
  filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchInput) ||
    (recipe.description && recipe.description.toLowerCase().includes(searchInput))
  );

function filterRecipesByCuisine() {
  const cuisine = document.getElementById("cuisine").value.toLowerCase();
  filteredRecipes = cuisine
    ? allRecipes.filter(
      (recipe) => recipe.cuisine && recipe.cuisine.toLowerCase() === cuisine
    )
    : allRecipes;
  currentPage = 1;
  displayRecipesWithPagination();
};

// **Filter Recipes by Category**
const filterByCategory = (category) => {
  filteredRecipes = allRecipes.filter(
    (recipe) => recipe.mealType && recipe.mealType.toLowerCase() === category.toLowerCase()
  );

  currentPage = 1; 
  displayRecipesWithPagination();
};

// **Attach Event Listeners After DOM Loads**
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#searchInput").addEventListener("input", searchRecipes);

  document.querySelectorAll(".category_btn").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.textContent.trim();
      filterByCategory(selectedCategory);
    });
  });
});
}
