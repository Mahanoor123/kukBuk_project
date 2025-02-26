// Function to get Recipe ID from URL
const getRecipeIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

// Fetch and Display Recipe Details
const fetchRecipeDetails = async () => {
  const recipeId = getRecipeIdFromUrl();
  if (!recipeId) {
    console.error("Recipe ID not found in URL");
    document.getElementById("recipe-name").textContent = "Recipe Not Found";
    return;
  }

  try {
    // Get recipe document from Firestore
    const recipeRef = doc(db, "userrecipie", recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if (recipeSnap.exists()) {
      const recipeData = recipeSnap.data();

      // Populate HTML with API Data
      document.getElementById("recipe-name").textContent =
        recipeData.name || "Unknown Recipe";
      document.getElementById("recipe-image").src =
        recipeData.image || "https://via.placeholder.com/800";
      document.getElementById("chef-name").textContent =
        recipeData.chef || "Unknown Chef";
      document.getElementById("upload-time").textContent =
        recipeData.uploadTime || "Recently Uploaded";
      document.getElementById("comments").textContent = `Comments: ${
        recipeData.reviewCount || "No comments yet"
      }`;
      document.getElementById("rating").textContent = `Rating: ${
        recipeData.rating || "★★★★☆"
      }`;
      document.getElementById("servings").textContent =
        recipeData.servings || "N/A";
      document.getElementById("time").textContent = recipeData.prepTimeMinutes
        ? `${recipeData.prepTimeMinutes} min`
        : "N/A";
      document.getElementById("calories").textContent =
        recipeData.caloriesPerServing
          ? `${recipeData.caloriesPerServing} kcal`
          : "Calories not available";

      // Populate Ingredients List
      const ingredientsList = document.getElementById("ingredients");
      ingredientsList.innerHTML = "";
      if (Array.isArray(recipeData.ingredients)) {
        recipeData.ingredients.forEach((ingredient) => {
          let li = document.createElement("li");
          li.textContent = ingredient;
          ingredientsList.appendChild(li);
        });
      } else {
        ingredientsList.innerHTML = "<li>No ingredients listed</li>";
      }

      // Populate Instructions List
      const instructionsList = document.getElementById("instructions");
      instructionsList.innerHTML = "";
      if (Array.isArray(recipeData.instructions)) {
        recipeData.instructions.forEach((step, index) => {
          let li = document.createElement("li");
          li.textContent = `${index + 1}. ${step}`;
          instructionsList.appendChild(li);
        });
      } else {
        instructionsList.innerHTML = "<li>No steps provided</li>";
      }
    } else {
      console.error("Recipe not found");
      document.getElementById("recipe-name").textContent = "Recipe Not Found";
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    document.getElementById("recipe-details").innerHTML =
      "<p>Error loading recipe details. Please try again later.</p>";
  }
};

// Run function on page load
document.addEventListener("DOMContentLoaded", fetchRecipeDetails);
