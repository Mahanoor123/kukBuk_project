import {
  onAuthStateChanged,
  auth,
  signOut,
  collection,
  db,
  getDocs,
} from "/firebase/firebase-config.js";

onAuthStateChanged(auth, async (user) => {
  const loginBtn = document.querySelector(".login_btn");
  const userProfile = document.querySelector(".user_profile");

  if (user) {
    console.log("User Logged in");
    if (loginBtn) loginBtn.style.display = "none";
    if (userProfile) userProfile.style.display = "block";
  } else {
    console.log("No user logged in");
    if (userProfile) userProfile.style.display = "none";
    if (loginBtn) loginBtn.style.display = "block";
  }
});

/***** User profile slider *****/

document.querySelector(".user_profile")?.addEventListener("click", () => {
  document.querySelector(".main_profile").style.right = "0";
});

document.querySelector(".main_profile .fa-close")?.addEventListener("click", () => {
  document.querySelector(".main_profile").style.right = "-50vw";
});

const userLogOut = async () => {
  try {
    await signOut(auth);
    alert("You have been logged out successfully!");
    window.location.href = "/public-src/index.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
document.querySelector(".logout")?.addEventListener("click", userLogOut);





const fetchRecipes = async () => {
  try {
    // Reference to "Recipes" collection
    const recipesCollection = collection(db, "Recipes");

    // Get all documents from the collection
    const querySnapshot = await getDocs(recipesCollection);

    // Store fetched recipes in an array
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });

    console.log("Fetched Recipes:", recipes); // Debugging
    displayRecipes(recipes); // Call function to show recipes in UI
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};



const displayRecipes = (recipes) => {
  const recipeContainer = document.querySelector(".recipes_cards_display"); 

  recipeContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card"); 

    recipeCard.innerHTML = `
      <img src="${recipe.imageURL}" alt="${recipe.recipeTitle}" class="recipe-image">
      <h3>${recipe.recipeTitle}</h3>
      <p>${recipe.description}</p>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Time:</strong> ${recipe.time} minutes</p>
      <button onclick="viewRecipe('${recipe.id}')">View Recipe</button>
    `;

    recipeContainer.appendChild(recipeCard);
  });
};

document.addEventListener("DOMContentLoaded", fetchRecipes);


/***** Static Card Generator *****/

let recipesCard = [
  {
    title: "Creamy Meatball Spaghetti",
    image: "./Assets/Homepage/assets/Recipes/recipe1.png",
    chef: "./Assets/Homepage/assets/chefs/chef1.jpg",
    chef_name: "John Doe",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Red sauce cherry pasta",
    image: "./Assets/Homepage/assets/Recipes/recipe2.png",
    chef: "./Assets/Homepage/assets/chefs/chef2.jpg",
    chef_name: "Suzzy yan",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Potatoes Chicken veg",
    image: "./Assets/Homepage/assets/Recipes/recipe3.png",
    chef: "./Assets/Homepage/assets/chefs/chef3.jpg",
    chef_name: "Sheraz khan",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Special Chinese Prawns",
    image: "./Assets/Homepage/assets/Recipes/recipe4.png",
    chef: "./Assets/Homepage/assets/chefs/chef4.jpg",
    chef_name: "Layana Sbari",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Italian Sauce Lasagna",
    image: "./Assets/Homepage/assets/Recipes/recipe5.png",
    chef: "./Assets/Homepage/assets/chefs/chef5.jpg",
    chef_name: "Ella michale",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Ultimate Tomato Purry pasta",
    image: "./Assets/Homepage/assets/Recipes/recipe6.png",
    chef: "./Assets/Homepage/assets/chefs/chef6.jpg",
    chef_name: "Aina Batool",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Merinated Mayo Potatoes",
    image: "./Assets/Homepage/assets/Recipes/recipe7.png",
    chef: "./Assets/Homepage/assets/chefs/chef7.jpg",
    chef_name: "Suzzena",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Chicken Bombay Style Biryani",
    image: "./Assets/Homepage/assets/Recipes/recipe8.png",
    chef: "./Assets/Homepage/assets/chefs/chef8.jpg",
    chef_name: "Asra sheikh",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Spicy Reshmi Seekh Kabab",
    image: "./Assets/Homepage/assets/Recipes/recipe9.png",
    chef: "./Assets/Homepage/assets/chefs/chef9.jpg",
    chef_name: "Billie Ben",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Coffe and milk pudding",
    image: "./Assets/Homepage/assets/Recipes/recipe10.png",
    chef: "./Assets/Homepage/assets/chefs/chef10.jpg",
    chef_name: "Jamaica husn",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Strawberry chia smoothie",
    image: "./Assets/Homepage/assets/Recipes/recipe11.png",
    chef: "./Assets/Homepage/assets/chefs/chef11.jpg",
    chef_name: "Janny shen",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Special mint and pine colada",
    image: "./Assets/Homepage/assets/Recipes/recipe12.png",
    chef: "./Assets/Homepage/assets/chefs/chef12.jpg",
    chef_name: "Iliana Dcruz",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
];

for (let val = 0; val < recipesCard.length; val++) {
  let recipeDisplay = document.querySelector(".recipes_cards_display");
  let recipeCard = document.createElement("div");
  recipeCard.setAttribute("class", "recipe_card");
  let cardContent = `<div class="recipe_content">
                        <h5>${recipesCard[val].title}</h5>
                        <div class="rating">
                            ${recipesCard[val].rating}
                        </div>
                        <div class="chef">
                            <img src="${recipesCard[val].chef}">
                            <p>${recipesCard[val].chef_name}</p>
                        </div>
                        <button class="recipe_btn"onclick="window.open('./Assets/all-recipes/html/fullView.html')"><i class="fa-solid fa-arrow-right"></i> View Recipe</button>
                    </div>
                    <img src="${recipesCard[val].image}" class="recipe_img">`;
  recipeCard.innerHTML = cardContent;
  recipeDisplay.appendChild(recipeCard);
}

/***** Chef Profiling *****/

var chefsProfile = [
  {
    name: "John Doe",
    tag: "perfect Food Nutritionist",
    image: "./Assets/Homepage/assets/chefs/chef1.jpg",
    bio: "John Doe Miller is a really good and top rated chef who serve the community and sharing her recipes since 4 years, having above 50+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "121 reviews",
  },
  {
    name: "Aina batool",
    tag: "Desi Cuisine expert",
    image: "./Assets/Homepage/assets/chefs/chef6.jpg",
    bio: "Aina Batool is our desi cuisine expert chef and one of the top rated chef, having above 100+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "234 reviews",
  },
  {
    name: "Janny shen",
    tag: "Master Chef of Chinese",
    image: "./Assets/Homepage/assets/chefs/chef11.jpg",
    bio: "Janny Shen is a really good and people's favorite chef who serve and sharing her recipes since 2 years, having above 40+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "220 reviews",
  },
  {
    name: "Iliana Dcruz",
    tag: "Bakery items expert",
    image: "./Assets/Homepage/assets/chefs/chef12.jpg",
    bio: "Iliana Dcruz is favorite chef of anyone who love to eat bakery items, she connect with us since 2 years, having above 50+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "210 reviews",
  },
];

for (let val = 0; val < chefsProfile.length; val++) {
  let chefsDisplay = document.querySelector(".chefs_display");
  let chefCard = document.createElement("div");
  chefCard.setAttribute("class", "chef_profile");
  let chefContent = `<img src="${chefsProfile[val].image}" class="chef_img">
                    <div class="chef_content">
                        <h5>${chefsProfile[val].name}</h5>
                        <p>(${chefsProfile[val].tag})</p>
                        <div class="ratings">
                            ${chefsProfile[val].rating}
                            <span>${chefsProfile[val].reviews}</span>
                        </div>
                    </div>
                    <div class="chef_links">
                        <i class="fa-regular fa-heart"></i>
                        <button class="chef_btn">View Profile <i class="fa-solid fa-arrow-right"></i></button>
                    </div>`;

  chefCard.innerHTML = chefContent;
  chefsDisplay.appendChild(chefCard);
}

document.querySelectorAll(".chef_btn")?.forEach((button, val) => {
  button.addEventListener("click", () => {
    document.querySelector(".chef_preview").style.display = "flex";

    document.querySelector(".single_profile").innerHTML = `
    <div class="single_profile">
            <div class="chef_image">
                <img src="${chefsProfile[val].image}">
            </div>
            <h5 class="chefname">${chefsProfile[val].name}</h5>
            <small class="cheftag">(${chefsProfile[val].tag})</small>
            <p class="chefbio">${chefsProfile[val].bio}</p>
            <div class="chef_rating">
                <div class="stars">
                ${chefsProfile[val].rating}
                </div>
                <div class="chef_review">${chefsProfile[val].reviews}</div>
            </div>
            <div class="chef_social">
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-linkedin"></i>
            </div>
        </div>
    `;
  });
  document.querySelector(".fa-close")?.addEventListener("click", () => {
    document.querySelector(".chef_preview").style.display = "none";
  });
});
