import { db, collection, doc, getDocs, query, orderBy, deleteDoc, updateDoc, setDoc } from '/firebase/firebase-config.js';

/**************************************************/
/*********** Overall function working  ************/
/**************************************************/
document?.addEventListener('DOMContentLoaded', function () {
  let userCollection = [];
  let favouriteCollection = [];

  /**************************************************/
  /*********** Fetch and display recipes ************/
  /**************************************************/
  const fetchAndDisplayCards = async () => {
    try {

      console.log("Fetching recipes from Firestore...");

      const querySnapshot = await getDocs(query(collection(db, "userrecipie"), orderBy("timestamp", "desc")));
      userCollection = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        console.log("Fetched recipe:", data);
        userCollection.push({
          id: doc.id,
          imageURL: data.imageURL,
          recipeTitle: data.recipeTitle,
          preparationTime: data.time,
          servings: data.servings,
          description: data.description,
          category: data.category,
          cookingSteps: data.cookingSteps,
          calories: data.calories,
          cookingIngredients: data.cookingIngredients
        });
      });

      displayCards(userCollection);
    } catch (error) {
      console.error("Error fetching user recipes from Firestore: ", error);
    }
  };

  /******************************************/
  /***********  Display recipes  ************/
  /******************************************/
  const displayCards = (collection) => {
    const userCard = document.getElementById("userCollection");

    if (!userCard) {
      return;
    }

    userCard.innerHTML = '';

    /******************************************************/
    /***********  Display collection of cards  ************/
    /******************************************************/
    collection.forEach((recipe, index) => {
      console.log("Displaying recipe:", recipe.imageURL);
      const card = document.createElement("div");
      card.setAttribute("class", "col");
      card.innerHTML = `
        <div class="recipe card recipie-card">
          <div class="recipe-img-div">
            <img src="${recipe.imageURL}" class="recipe_img" width="200px" height="200px">
          </div>
          <div class="recipe_content">
            <h4 class="h4">${recipe.recipeTitle}</h4>

            <div class="d-flex  text-center mt-4 flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">

            <div class="d-flex  text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">

              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Category:</div>
                <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
              </div>
              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Calories:</div>
                <small><span class="recipie-span">${recipe.calories}</span></small>
              </div>
              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Serving:</div>
                <small><span class="recipie-span">${recipe.servings}</span></small>
              </div>
            </div>
            <p >${recipe.description}</p>
            <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">
              <div class="text-center">
               <button><a href='/public-src/Assets/all-recipes/html/fullview.html' class="text-decoration-none text-light">View
            Recipe</a></button> <br /> <br/>
                </div>
              
                </div>
              <div class="recipe_info">
                <span>
                  <img src="../asset/logo_imgs/heart.png" alt="img" width="18px" onclick="addToFavorites(${index})"> 2k Likes
                </span>
                <span>
                  <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px"> 243

                </span>
                <span>
                  <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
                  <span>${recipe.preparationTime} Min</span>
                </span>

                </div>
                <br/>
                <div class="text-center">
                <button href="#" class="btn mb-3 recipiebtn_curd text-light" onclick="deleteCard(${index})">Delete Recipe</button>
                <button href="#" class="btn mb-3 recipiebtn_curd text-light" onclick="updateCard(${index})">Update Recipe</button>
                 </div>
                 </div>
                 </div>
            </div>
            `;
      userCard.appendChild(card);

    });
  };

  /***********************************************/
  /***********  Add to Favorites  ************/
  /***********************************************/
  window.addToFavorites = async (index) => {
    try {
      const recipe = userCollection[index];
      await setDoc(doc(db, "favouriterecipie-card", recipe.id), recipe);

      console.log("Recipe added to favorites successfully!");
      displayFavoriteCard(recipe); // Display the favorite card in the favorite container
    } catch (error) {
      console.error("Error adding recipe to favorites: ", error);
    }
  };

  /******************************************/
  /***********  Display favorite card  ************/
  /******************************************/
  const displayFavoriteCard = (recipe) => {
    const favouriteCard = document.getElementById("userfavouriteCollection");

    if (!favouriteCard) {
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
          <div class="d-flex flex-lg-row flex-md-row text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
            <div class="recipie-span-div align-items-center justify-content-center">
              <div>Category:</div>
              <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
            </div>
            <div class="recipie-span-div align-items-center justify-content-center">
              <div>Calories:</div>
              <small><span class="recipie-span">${recipe.calories}</span></small>
            </div>
            <div class="recipie-span-div align-items-center justify-content-center">
              <div>Serving:</div>
              <small><span class="recipie-span">${recipe.servings}</span></small>
            </div>
          </div>
          <p>${recipe.description}</p>
          <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">

           
            <div class="text-center">
              <button onclick="window.open('./Assets/all-recipes/html/fullView.html')">View Recipe</button>

            </div>
            <div class="recipe_info">
              <span>
                <img src="../asset/logo_imgs/heart.png" alt="img" width="18px" onclick="removeFromFavorites('${recipe.id}')"> 2k Likes
              </span>
              <span>
                <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px"> 243
              </span>
              <span>
                <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
                <span>${recipe.preparationTime} Min</span>
              </span>
            </div>
            
          </div>
          
        </div>
      </div>
    `;
    favouriteCard.appendChild(card);
  };

  /***********************************************/
  /***********  Remove from Favorites  ************/
  /***********************************************/
  window.removeFromFavorites = async (id) => {
    try {
      await deleteDoc(doc(db, "favouriterecipie-card", id));

      console.log("Recipe removed from favorites successfully!");
      fetchAndDisplayFavorites();
    } catch (error) {
      console.error("Error removing recipe from favorites: ", error);
    }
  };

  /***********************************************/
  /***********  Fetch and display favorites  ************/
  /***********************************************/
  const fetchAndDisplayFavorites = async () => {
    try {
      console.log("Fetching favorite recipes from Firestore...");
      const querySnapshot = await getDocs(collection(db, "favouriterecipie-card"));
      favouriteCollection = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        console.log("Fetched favorite recipe:", data);
        favouriteCollection.push({
          id: doc.id,
          ...data
        });
      });

      displayFavorites(favouriteCollection);
    } catch (error) {
      console.error("Error fetching favorite recipes from Firestore: ", error);
    }
  };

  /******************************************/
  /***********  Display favorites  ************/
  /******************************************/
  const displayFavorites = (collection) => {
    const favouriteCard = document.getElementById("userfavouriteCollection");

    if (!favouriteCard) {
      return;
    }

    favouriteCard.innerHTML = '';

    /******************************************************/
    /***********  Display collection of favorite cards  ************/
    /******************************************************/
    collection.forEach((recipe, index) => {
      console.log("Displaying favorite recipe:", recipe.imageURL);
      const card = document.createElement("div");
      card.setAttribute("class", "col");
      card.innerHTML = `
      <div class="recipe card recipie-card" >
          <div class="recipe-img-div">
            <img src="${recipe.imageURL}" class="recipe_img" width="200px" height="200px">
          </div>
          <div class="recipe_content">
            <h4 class="h4">${recipe.recipeTitle}</h4>
            <div class="d-flex flex-lg-row flex-md-row text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Category:</div>
                <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
              </div>
              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Calories:</div>
                <small><span class="recipie-span">${recipe.calories}</span></small>
              </div>
              <div class="recipie-span-div align-items-center justify-content-center">
                <div>Serving:</div>
                <small><span class="recipie-span">${recipe.servings}</span></small>
              </div>
            </div>
            <p >${recipe.description}</p>
            <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">
              <div class="text-center">
                <button onclick="window.open('./Assets/all-recipes/html/fullView.html')">View Recipe</button>
              </div>
              <div class="recipe_info">
                <span>
                  <img src="../asset/logo_imgs/heart.png" alt="img" width="18px" onclick="removeFromFavorites('${recipe.id}')"> 2k Likes
                </span>
                <span>
                  <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px"> 243
                </span>
                <span>
                  <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
                  <span>${recipe.preparationTime} Min</span>
                </span>
              </div>
              
            </div>
          </div>
        </div > `;
      favouriteCard.appendChild(card);
    });
  };

  /***********************************************/
  /***********  delete Card function  ************/
  /***********************************************/
  window.deleteCard = async (index) => {
    try {
      const recipe = userCollection[index];
      const deletecard = await deleteDoc(doc(db, "userrecipie", recipe.id));

      console.log(deletecard);
      console.log("Recipe deleted successfully!");
      fetchAndDisplayCards();
    } catch (error) {
      console.error("Error deleting recipe from Firestore: ", error);
    }
  };

  /***********************************************/
  /***********  update Card function  ************/
  /***********************************************/

  window.updateCard = (index) => {
    const recipe = userCollection[index];
    document.getElementById('recipeIndex').value = index;
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


  document.getElementById('updateRecipeForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const index = document.getElementById('recipeIndex').value;
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
      const updatecards = await updateDoc(doc(db, "userrecipie", userCollection[index].id), recipe);

      console.log(updatecards);
      console.log("Recipe updated successfully!");
      fetchAndDisplayCards();

      const updateRecipeModal = bootstrap.Modal.getInstance(document.getElementById('updateRecipeModal'));
      updateRecipeModal.hide();
    }

    catch (error) {
      console.error("Error updating recipe in Firestore: ", error);
    }
  });

  window.updateCard = async (index) => {
    try {
      const recipe = userCollection[index];
      const newRecipeTitle = prompt("Enter new recipe title:", recipe.recipeTitle);

      if (newRecipeTitle) {
        const updatecards = await updateDoc(doc(db, "userrecipie", recipe.id), {
          recipeTitle: newRecipeTitle
        });

        console.log(updatecards);
        console.log("Recipe updated successfully!");
        fetchAndDisplayCards();
      }
    } catch (error) {
      console.error("Error updating recipe in Firestore: ", error);
    }
  };

  fetchAndDisplayCards();
  fetchAndDisplayFavorites();
});




// import { db, collection, doc, getDocs, query, orderBy, deleteDoc, updateDoc } from '/firebase/firebase-config.js';

// /**************************************************/
// /*********** Overall function working  ************/
// /**************************************************/
// document?.addEventListener('DOMContentLoaded', function () {
//   let userCollection = [];

//   /**************************************************/
//   /*********** Fetch and display recipes ************/
//   /**************************************************/
//   const fetchAndDisplayCards = async () => {
//     try {
//       console.log("Fetching recipes from Firestore...");
//       const querySnapshot = await getDocs(query(collection(db, "userrecipie"), orderBy("timestamp", "desc")));
//       userCollection = [];

//       querySnapshot.forEach(doc => {
//         const data = doc.data();
//         console.log("Fetched recipe:", data);
//         userCollection.push({
//           id: doc.id,
//           imageURL: data.imageURL,
//           recipeTitle: data.recipeTitle,
//           preparationTime: data.time,
//           servings: data.servings,
//           description: data.description,
//           category: data.category,
//           cookingSteps: data.cookingSteps,
//           calories: data.calories,
//           cookingIngredients: data.cookingIngredients
//         });
//       });

//       displayCards(userCollection);
//     } catch (error) {
//       console.error("Error fetching user recipes from Firestore: ", error);
//     }
//   };

//   /******************************************/
//   /***********  Display recipes  ************/
//   /******************************************/
//   const displayCards = (collection) => {
//     const userCard = document.getElementById("userCollection");

//     if (!userCard) {
//       return;
//     }

//     userCard.innerHTML = '';

//     /******************************************************/
//     /***********  Display collection of cards  ************/
//     /******************************************************/
//     collection.forEach((recipe, index) => {
//       console.log("Displaying recipe:", recipe.imageURL);
//       const card = document.createElement("div");
//       card.setAttribute("class", "col");
//       card.innerHTML = `
//         <div class="recipe card recipie-card">
//           <div class="recipe-img-div">
//             <img src="${recipe.imageURL}" class="recipe_img" width="200px" height="200px">
//           </div>
//           <div class="recipe_content">
//             <h4 class="h4">${recipe.recipeTitle}</h4>
//             <div class="d-flex flex-lg-row flex-md-row text-center flex-column align-items-center justify-content-between mt-lg-4 mb-4 ">
//               <div class="recipie-span-div align-items-center justify-content-center">
//                 <div>Category:</div>
//                 <small><span class="recipie-span">${recipe.category.join(", ")}</span></small>
//               </div>
//               <div class="recipie-span-div align-items-center justify-content-center">
//                 <div>Calories:</div>
//                 <small><span class="recipie-span">${recipe.calories}</span></small>
//               </div>
//               <div class="recipie-span-div align-items-center justify-content-center">
//                 <div>Serving:</div>
//                 <small><span class="recipie-span">${recipe.servings}</span></small>
//               </div>
//             </div>
//             <p>${recipe.description}</p>
//             <div class="recipe_links d-flex flex-lg-row flex-column justify-content-center align-items-center">
//               <div class="text-center">
//                 <button onclick="window.open('./Assets/all-recipes/html/fullView.html')">View Recipe</button>
//               </div>
//               <div class="recipe_info">
//                 <span>
//                   <img src="../asset/logo_imgs/heart.png" alt="img" width="18px"> 2k Likes
//                 </span>
//                 <span>
//                   <img src="../asset/logo_imgs/material-symbols--comment-outline.png" alt="img" width="18px"> 243
//                 </span>
//                 <span>
//                   <img src="../asset/logo_imgs/icons8-time-50.png" alt="img" width="18px">
//                   <span>${recipe.preparationTime} Min</span>
//                 </span>
//               </div>
//             </div>
//             <div class="text-center">
//               <a href="#" class="btn mb-3 recipiebtn_curd text-light" onclick="deleteCard(${index})">Delete Recipe</a>
//               <a href="#" class="btn mb-3 recipiebtn_curd text-light" onclick="updateCard(${index})">Update Recipe</a>
//             </div>
//           </div>
//         </div>
//       `;
//       userCard.appendChild(card);
//     });

//   };

//   /***********************************************/
//   /***********  delete Card function  ************/
//   /***********************************************/
//   window.deleteCard = async (index) => {
//     try {
//       const recipe = userCollection[index];
//       const deletecard = await deleteDoc(doc(db, "userrecipie", recipe.id));

//       console.log(deletecard);
//       console.log("Recipe deleted successfully!");
//       fetchAndDisplayCards();
//     } catch (error) {
//       console.error("Error deleting recipe from Firestore: ", error);
//     }
//   };

//   /***********************************************/
//   /***********  update Card function  ************/
//   /***********************************************/
//   window.updateCard = async (index) => {
//     try {
//       const recipe = userCollection[index];
//       const newRecipeTitle = prompt("Enter new recipe title:", recipe.recipeTitle);

//       if (newRecipeTitle) {
//         const updatecards = await updateDoc(doc(db, "userrecipie", recipe.id), {
//           recipeTitle: newRecipeTitle
//         });

//         console.log(updatecards);
//         console.log("Recipe updated successfully!");
//         fetchAndDisplayCards();
//       }
//     } catch (error) {
//       console.error("Error updating recipe in Firestore: ", error);
//     }
//   };

//   fetchAndDisplayCards();
// });

