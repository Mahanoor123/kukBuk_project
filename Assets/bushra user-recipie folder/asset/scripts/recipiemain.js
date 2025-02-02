// ----------------------------------user collection card section--------------------
document.addEventListener("DOMContentLoaded", function () {
  let userCollection = JSON.parse(localStorage.getItem('userCollection')) || [];

  // Define the deleteCard function within DOMContentLoaded
  function deleteCard(index) {
    userCollection.splice(index, 1);
    localStorage.setItem('userCollection', JSON.stringify(userCollection));
    displayCards(userCollection);
  }

  function displayCards(collection) {
    const userCard = document.getElementById("userCollection");
    userCard.innerHTML = ''; // Clear previous content

    collection.forEach((recipe, index) => {
      console.log(recipe.file); // Ensure this logs the correct image path

      const card = document.createElement("div");
      card.setAttribute("class", "col p-1 mb-lg-5 mb-md-5 mb-3 justify-content-center align-items-center");
      card.innerHTML = `
                <div class="p-2 border pb-3 justify-content-center align-items-center rounded-2 text-light user-recipie-card"
                    style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;">
                  <div class="user-recipie-imagediv rounded-2 bg-light border">
                    <img src="${recipe.file}" class="card-img-top user-recipie-image rounded-2" alt="img" width="200" height="200"
                      style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
                  </div>
                  <div class="mt-3 rounded-2 border card-body user-recipie-body">
                    <h6 class="card-title pt-3">Recipe Name: <span style="color: #E96728;">${recipe.recipeTitle}</span></h6>
                    <hr>
                    <div class="d-flex justify-content-between">
                      <p class="card-title h6 pb-3 align-items-center">
                        <img src="./asset/logo_imgs/icons8-time-50.png" class="heartSvg" width="20" height="20">
                        <span>${recipe.preparationTime}</span> Minutes
                      </p>
                      <p class="card-title h6 pb-3">
                        <img src="./asset/logo_imgs/person.png" class="heartSvg" width="20" height="20">
                        <span>${recipe.servings}</span> Persons
                      </p>
                    </div>
                    <h4 class="card-title h6 p-1 pb-3">Description: </h4>
                    <span class="user-recipie-description" style="font-size: 15px;">${recipe.description}</span>
                    <hr>
                    <div class="text-center">
                      <a href="#" class="btn mb-3 text-light" style="background-color: #E96728; box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;">View Recipe</a>
                      <a href="#" class="btn mb-3 text-light" style="background-color: #E96728; box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" onclick="deleteCard(${index})">Delete Recipie</a>
              
                    </div>
                  </div>
                </div>
              `;
      userCard.appendChild(card);
    });
  }

  // Expose deleteCard to the global window object so it can be called from HTML
  window.deleteCard = deleteCard;

  // Display cards on page load
  displayCards(userCollection.reverse());
});