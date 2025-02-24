import { db, collection } from '/firebase/firebase-config.js';

// Fetch and Display Recipes
async function fetchAndDisplayCards() {
    const userCard = document.getElementById("userCard");
    userCard.innerHTML = '';

    const querySnapshot = await db.collection("userrecipie").get();
    const collection = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    collection.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
        <div class="card recipe-card">
        <img src="${recipe.imageURL}" class="card-img-top">
                    <div class="card-body">
                    <h4 class="card-title">${recipe.recipeTitle}</h4>
                        <p><strong>Category:</strong> ${recipe.category.join(", ")}</p>
                        <p><strong>Calories:</strong> ${recipe.calories}</p>
                        <p><strong>Serving:</strong> ${recipe.servings}</p>
                        <p><strong>Time:</strong> ${recipe.preparationTime} Min</p>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                        <p><strong>Cooking Steps:</strong> ${recipe.cookingSteps.join(", ")}</p>
                        <p>${recipe.description}</p>
                        <div class="d-flex justify-content-between">
                        <button class="btn btn-primary" onclick="updateCard(${index})">Update</button>
                        <button class="btn btn-danger" onclick="deleteCard(${index})">Delete</button>
                        </div>
                        </div>
                        </div>
                        `;
        userCard.appendChild(card);
    });
}

// Delete Recipe
async function deleteCard(index) {
    try {
        const recipe = collection[index];
        await db.collection("userrecipie").doc(recipe.id).delete();
        alert("Recipe deleted successfully!");
        fetchAndDisplayCards();
    } catch (error) {
        console.error("Error deleting recipe: ", error);
    }
}

// Update Recipe Modal
function updateCard(index) {
    const recipe = collection[index];
    document.getElementById('recipeIndex').value = index;
    document.getElementById('recipeTitle').value = recipe.recipeTitle;
    document.getElementById('preparationTime').value = recipe.preparationTime;
    document.getElementById('servings').value = recipe.servings;
    document.getElementById('description').value = recipe.description;

    const updateRecipeModal = new bootstrap.Modal(document.getElementById('updateRecipeModal'));
    updateRecipeModal.show();
}

document.getElementById('updateRecipeForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const index = document.getElementById('recipeIndex').value;
    const recipe = {
        recipeTitle: document.getElementById('recipeTitle').value,
        preparationTime: document.getElementById('preparationTime').value,
        servings: document.getElementById('servings').value,
        description: document.getElementById('description').value
    };

    try {
        await db.collection("userrecipie").doc(collection[index].id).update(recipe);
        alert("Recipe updated successfully!");
        fetchAndDisplayCards();
        const updateRecipeModal = bootstrap.Modal.getInstance(document.getElementById('updateRecipeModal'));
        updateRecipeModal.hide();
    } catch (error) {
        console.error("Error updating recipe: ", error);
    }
});

// Initial Fetch
fetchAndDisplayCards();
