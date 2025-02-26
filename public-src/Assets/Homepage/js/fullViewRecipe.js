
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMeJCTXbdJorjOdi-5woYwoG6rb7ddDDQ",
  authDomain: "kukbuk-project-45362.firebaseapp.com",
  projectId: "kukbuk-project-45362",
  storageBucket: "kukbuk-project-45362.firebasestorage.app",
  messagingSenderId: "695377977253",
  appId: "1:695377977253:web:e4bf823163001937c6924c",
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


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
            document.getElementById("time").textContent =
                recipeData.prepTimeMinutes
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
