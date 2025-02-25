import { db, collection, doc, getDocs, query, orderBy, deleteDoc, updateDoc, setDoc, onSnapshot, } from '/firebase/firebase-config.js';

/***********************************************/
/*********** Overall function working **********/
/***********************************************/

document?.addEventListener('DOMContentLoaded', function (event) {
  event.preventDefault()
  let userCollection = [];
  let favouriteCollection = [];


  /**************************************************/
  /*********** Fetch and display recipes ************/
  /**************************************************/
  const fetchAndDisplayCards = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "userrecipie"), orderBy("timestamp", "desc")));
      userCollection = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        userCollection.push({ id: doc.id, ...data });
      });

      displayCards(userCollection, "userCollection");
    }
    catch (error) {
      console.error("Error fetching user recipes from Firestore: ", error);
    }

  };


  /**************************************************/
  /*********** Fetch and display favorite recipes ************/
  /**************************************************/
  const fetchFavoriteCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "favouriterecipie-card"));
      favouriteCollection = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        favouriteCollection.push({ id: doc.id, ...data });
      });

      displayCards(favouriteCollection, "favouriteusercollection");
    } catch (error) {
      console.error("Error fetching favorite recipes from Firestore: ", error);
    }
  };



  /******************************************/
  /*********** Display recipes **************/
  /******************************************/
  const displayCards = (collection, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    container.innerHTML = '';
    collection.forEach((recipe, index) => {

      const card = document.createElement("div");
      card.setAttribute("class", "col");
      card.innerHTML = `
      
    <div class="recipe card recipie-card">
        <div class="recipe-img-div">
            <img src="${recipe.imageURL}" class="recipe_img" width="200px" height="200px">
        </div>
        <div class="recipe_content">
            <h4 class="h4">${recipe.recipeTitle}</h4>
            <div class="d-flex text-center mt-4 flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
                <div class="d-flex text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">
                        <div> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                                <defs>
                                    <mask id="ipSTag0">
                                        <g fill="none" stroke-linejoin="round" stroke-width="4">
                                            <path fill="#fff" stroke="#fff"
                                                d="M8 44V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v38l-16-8.273z" />
                                            <path stroke="#000" stroke-linecap="round" d="M16 18h16" />
                                        </g>
                                    </mask>
                                </defs>
                                <path fill="#e86209" d="M0 0h48v48H0z" mask="url(#ipSTag0)" />
                            </svg> Category : &nbsp; </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
                        </span>

                    </div>
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 2048 2048">
                                <path fill="#e86209"
                                    d="M1280 64q0 179 66 330t190 278t190 278t66 330q0 106-27 204t-78 183t-120 156t-155 120t-184 77t-204 28t-204-27t-183-78t-156-120t-120-155t-77-184t-28-204q0-84 18-165t52-155t84-141t113-121q7 38 19 78t28 80t38 76t46 67q20 25 52 25q27 0 45-19t19-46q0-11-3-20t-10-18q-28-41-49-81t-37-82t-23-87t-8-95q0-119 45-224t124-183T992 46t224-46h64zm-256 1856q133 0 249-50t204-137t137-203t50-250q0-151-56-281t-162-236q-130-131-204-289t-88-342q-83 11-153 50t-123 99t-81 135t-29 160q0 78 23 141t68 126q19 26 29 54t11 62q0 40-15 75t-42 61t-61 42t-75 15q-46 0-81-17t-62-46t-48-65t-40-72q-46 73-68 157t-23 171q0 133 50 249t137 204t203 137t250 50" />
                            </svg>
                            Calories : &nbsp;
                        </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.calories}</span></small>
                        </span>
                    </div>
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <path fill="#e86209" fill-rule="evenodd"
                                    d="M7 .103a.75.75 0 0 1 .75.75v1.04A7 7 0 0 1 14 8.854a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5a7 7 0 0 1 6.25-6.96V.854A.75.75 0 0 1 7 .103M.78 11.75a.75.75 0 0 0 0 1.5h12.44a.75.75 0 0 0 0-1.5z"
                                    clip-rule="evenodd" />
                            </svg>
                            Serving : &nbsp;
                        </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.servings}</span></small>
                        </span>
                        </div>
                        <br />
                                       <p class="paara">${recipe.description}</p>
                    <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">
                        <div class="text-center">
                            <button><a href='/public-src/Assets/all-recipes/html/fullview.html'
                                    class="text-decoration-none text-light">View Recipe</a></button> <br /> <br />
                        </div>
                    </div>
                    <div class="recipe_info">
                        <span>
                            <img src="../asset/logo_imgs/heart.png" alt="img" width="18px"
                                onclick="addToFavorites(${index})"> 2k Likes
                        </span>
                        <span>
                            <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px">
                            243
                        </span>
                        <span>
                        
                            <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
                            <span>${recipe.time} Min</span>
                        </span>
                    </div>
                     <br />
                    <div class="text-center">
                        <button href="#" class="btn mb-3 recipiebtn_curd text-light"
                            onclick="deleteCard(${index}, '${containerId}')">Delete Recipe</button>
                        <button href="#" class="btn mb-3 recipiebtn_curd text-light"
                            onclick="updateCard(${index}, '${containerId}')">Update Recipe</button>
                    </div>
                </div>
            </div>
        </div>
        `;
      container.appendChild(card);
    });
  };

  /***********************************************/
  /*********** Delete Card Function **************/
  /***********************************************/
  // Function to set up real-time listeners
  const setUpRealTimeListeners = () => {
    const userCollectionRef = collection(db, "userrecipie");
    const favouriteCollectionRef = collection(db, "favouriterecipie-card");

    // Listen for real-time updates in userCollection
    onSnapshot(userCollectionRef, (snapshot) => {
      userCollection = [];
      snapshot.forEach((doc) => {
        userCollection.push({ id: doc.id, ...doc.data() });
      });
      fetchAndDisplayCards(); // Ensure this function is called correctly
    });

    // Listen for real-time updates in favouriteCollection
    onSnapshot(favouriteCollectionRef, (snapshot) => {
      favouriteCollection = [];
      snapshot.forEach((doc) => {
        favouriteCollection.push({ id: doc.id, ...doc.data() });
      });
      fetchAndDisplayCards(); // Ensure this function is called correctly
    });
  };

  // Call the function to set up real-time listeners
  setUpRealTimeListeners();

  window.deleteCard = async (index, containerId) => {
    try {
      const collectionName = containerId === "userCollection" ? "userrecipie" : "favouriterecipie-card";
      const recipe = containerId === "userCollection" ? userCollection[index] : favouriteCollection[index];
      await deleteDoc(doc(db, collectionName, recipe.id));
      console.log("Recipe deleted successfully!");
      // No need to call fetchAndDisplayCards here since real-time listeners handle updates
    } catch (error) {
      console.error("Error deleting recipe from Firestore: ", error);
    }
  };



  /***********************************************/
  /***********************************************/
  /***********************************************/
  /***********************************************/
  /***********************************************/
  /***********************************************/
  /***********************************************/



  /***********************************************/
  /*********** Update Card Function **************/
  /***********************************************/
  window.updateCard = (index, containerId) => {
    const recipe = containerId === "userCollection" ? userCollection[index] : favouriteCollection[index];
    document.getElementById('recipeIndex').value = index;
    document.getElementById('recipeType').value = containerId;
    document.getElementById('recipeTitle').value = recipe.recipeTitle;
    document.getElementById('preparationTime').value = recipe.preparationTime;
    document.getElementById('servings').value = recipe.servings;
    document.getElementById('description').value = recipe.description;
    document.getElementById('category').value = recipe.category.join(", ");
    document.getElementById('calories').value = recipe.calories;
    document.getElementById('cookingSteps').value = recipe.cookingSteps;
    document.getElementById('cookingIngredients').value = recipe.cookingIngredients;

    const updateRecipeModal = new bootstrap.Modal(document.getElementById('updateRecipeModal'));
    updateRecipeModal.show();
  };

  /***********************************************/
  /*********** Update Recipe Form Submission ******/
  /***********************************************/
  document.getElementById('updateRecipeForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const index = document.getElementById('recipeIndex').value;
    const containerId = document.getElementById('recipeType').value;
    const recipe = {
      recipeTitle: document.getElementById('recipeTitle').value,
      preparationTime: document.getElementById('preparationTime').value,
      servings: document.getElementById('servings').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value.split(",").map(cat => cat.trim()),
      calories: document.getElementById('calories').value,
      cookingSteps: document.getElementById('cookingSteps').value,
      cookingIngredients: document.getElementById('cookingIngredients').value
    };

    try {
      if (containerId === "userCollection") {
        const updatecards = await updateDoc(doc(db, "userrecipie", userCollection[index].id), recipe);
      }
      else {
        const updatecards = await updateDoc(doc(db, "favouriterecipie-card", favouriteCollection[index].id), recipe);
      } console.log("Recipe updated successfully!");


      fetchAndDisplayCards();

      const updateRecipeModal = bootstrap.Modal.getInstance(document.getElementById('updateRecipeModal'));
      updateRecipeModal.hide();
    } catch (error) {
      console.error("Error updating recipe in Firestore: ", error);
    }
  });

  /***********************************************/
  /*********** Add to Favorites ************/
  /***********************************************/
  window.addToFavorites = async (index) => {
    try {
      const recipe = userCollection[index];
      await setDoc(doc(db, "favouriterecipie-card", recipe.id), recipe);

      console.log("Recipe added to favorites successfully!");
      favouriteCollection.push(recipe);
      displayFavoriteCard(recipe, favouriteCollection.length - 1);
    } catch (error) {
      console.error("Error adding recipe to favorites: ", error);
    }
  };

  /***********************************************/
  /*********** Display Favorite Card *************/
  /***********************************************/
  const displayFavoriteCard = (recipe, index) => {
    const favouriteUserCollection = document.getElementById("favouriteusercollection");

    if (!favouriteUserCollection) {
      return;
    }

    const card = document.createElement("div");
    card.setAttribute("class", "col");
    card.innerHTML = `
      <div class="recipe card recipie-card">
        <div class="recipe-img-div">
          <img src="${recipe.imageURL}" class="recipe_img" width="200px" height="200px">
        </div>
        <div class="recipe_content">
          <h4 class="h4">${recipe.recipeTitle}</h4>
                   <div class="d-flex text-center mt-4 flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
                <div class="d-flex text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">
                        <div> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                                <defs>
                                    <mask id="ipSTag0">
                                        <g fill="none" stroke-linejoin="round" stroke-width="4">
                                            <path fill="#fff" stroke="#fff"
                                                d="M8 44V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v38l-16-8.273z" />
                                            <path stroke="#000" stroke-linecap="round" d="M16 18h16" />
                                        </g>
                                    </mask>
                                </defs>
                                <path fill="#e86209" d="M0 0h48v48H0z" mask="url(#ipSTag0)" />
                            </svg> Category : &nbsp; </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
                        </span>

                    </div>
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 2048 2048">
                                <path fill="#e86209"
                                    d="M1280 64q0 179 66 330t190 278t190 278t66 330q0 106-27 204t-78 183t-120 156t-155 120t-184 77t-204 28t-204-27t-183-78t-156-120t-120-155t-77-184t-28-204q0-84 18-165t52-155t84-141t113-121q7 38 19 78t28 80t38 76t46 67q20 25 52 25q27 0 45-19t19-46q0-11-3-20t-10-18q-28-41-49-81t-37-82t-23-87t-8-95q0-119 45-224t124-183T992 46t224-46h64zm-256 1856q133 0 249-50t204-137t137-203t50-250q0-151-56-281t-162-236q-130-131-204-289t-88-342q-83 11-153 50t-123 99t-81 135t-29 160q0 78 23 141t68 126q19 26 29 54t11 62q0 40-15 75t-42 61t-61 42t-75 15q-46 0-81-17t-62-46t-48-65t-40-72q-46 73-68 157t-23 171q0 133 50 249t137 204t203 137t250 50" />
                            </svg>
                            Calories : &nbsp;
                        </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.calories}</span></small>
                        </span>
                    </div>
                    <div class="recipie-span-div d-flex align-items-center justify-content-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <path fill="#e86209" fill-rule="evenodd"
                                    d="M7 .103a.75.75 0 0 1 .75.75v1.04A7 7 0 0 1 14 8.854a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5a7 7 0 0 1 6.25-6.96V.854A.75.75 0 0 1 7 .103M.78 11.75a.75.75 0 0 0 0 1.5h12.44a.75.75 0 0 0 0-1.5z"
                                    clip-rule="evenodd" />
                            </svg>
                            Serving : &nbsp;
                        </div>&nbsp;
                        <span>

                            <small><span class="recipie-span">${recipe.servings}</span></small>
                        </span>
                    </div>
            <p>${recipe.description}</p>
            <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">
              <div class=" d-flex flex-lg-row justify-content-between ">
                <button>
                <a href='/public-src/Assets/all-recipes/html/fullview.html' class="text-decoration-none text-light">View Recipe</a>
                </button>&nbsp;&nbsp;
               <button href="#" class="btn mb-3 ms-2 recipiebtn_curd text-light" onclick="deleteCard(${index}, 'favouriteusercollection')">Delete Recipe</button>
  </div>
            </div> <br/><br/>
            <div class="recipe_info">
              <span>
                <img src="../asset/logo_imgs/heart.png" alt="img" width="18px" > 2k Likes
              </span>
              <span>
                <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px"> 243
              </span>
              <span>
                <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
                <span>${recipe.time} Min</span>
              </span>
            </div>
            <br/>
            </div>
        </div>
      </div>
    `;

    favouriteUserCollection.appendChild(card);
  };

  fetchAndDisplayCards();
});

