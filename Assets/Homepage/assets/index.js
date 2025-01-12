/***** Static Card Generator *****/

let recipesCard = [
  {
    title: "Creamy Meatball Spaghetti",
    image: "./assets/Images/Recipes/recipe1.png",
    chef: "./assets/Images/chefs/chef1.jpg",
    chef_name: "John Doe",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Red sauce cherry pasta",
    image: "./assets/Images/Recipes/recipe2.png",
    chef: "./assets/Images/chefs/chef2.jpg",
    chef_name: "Suzzy yan",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Potatoes Chicken veg",
    image: "./assets/Images/Recipes/recipe3.png",
    chef: "./assets/Images/chefs/chef3.jpg",
    chef_name: "Sheraz khan",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Special Chinese Prawns",
    image: "./assets/Images/Recipes/recipe4.png",
    chef: "./assets/Images/chefs/chef4.jpg",
    chef_name: "Layana Sbari",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Italian Sauce Lasagna",
    image: "./assets/Images/Recipes/recipe5.png",
    chef: "./assets/Images/chefs/chef5.jpg",
    chef_name: "Ella michale",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Ultimate Tomato Purry pasta",
    image: "./assets/Images/Recipes/recipe6.png",
    chef: "./assets/Images/chefs/chef6.jpg",
    chef_name: "Aina Batool",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Merinated Mayo Potatoes",
    image: "./assets/Images/Recipes/recipe7.png",
    chef: "./assets/Images/chefs/chef7.jpg",
    chef_name: "Suzzena",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Chicken Bombay Style Biryani",
    image: "./assets/Images/Recipes/recipe8.png",
    chef: "./assets/Images/chefs/chef8.jpg",
    chef_name: "Asra sheikh",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Spicy Reshmi Seekh Kabab",
    image: "./assets/Images/Recipes/recipe9.png",
    chef: "./assets/Images/chefs/chef9.jpg",
    chef_name: "Billie Ben",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Coffe and milk pudding",
    image: "./assets/Images/Recipes/recipe10.png",
    chef: "./assets/Images/chefs/chef10.jpg",
    chef_name: "Jamaica husn",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Strawberry chia smoothie",
    image: "./assets/Images/Recipes/recipe11.png",
    chef: "./assets/Images/chefs/chef11.jpg",
    chef_name: "Janny shen",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
  },
  {
    title: "Special mint and pine colada",
    image: "./assets/Images/Recipes/recipe12.png",
    chef: "./assets/Images/chefs/chef12.jpg",
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
                        <button class="recipe_btn"><i class="fa-solid fa-arrow-right"></i> View Recipe</button>
                    </div>
                    <img src="${recipesCard[val].image}" class="recipe_img">`;
  recipeCard.innerHTML = cardContent;
  recipeDisplay.appendChild(recipeCard);
}

/***** Chef Profiling *****/

let chefsProfile = [
  {
    name: "John Doe",
    tag: "perfect Food Nutritionist",
    image: "./assets/Images/chefs/chef1.jpg",
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
    image: "./assets/Images/chefs/chef6.jpg",
    bio: "Janee Doe Miller is a really good and top rated chef who serve a sharing her recipes since 4 years, having above 50+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "234 reviews",
  },
  {
    name: "Janny shen",
    tag: "Master Chef of Chinese",
    image: "./assets/Images/chefs/chef11.jpg",
    bio: "Janee Doe Miller is a really good and top rated chef who serve a sharing her recipes since 4 years, having above 50+ delicious recipes.",
    rating: `<i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>`,
    reviews: "220 reviews",
  },
  {
    name: "Iliana Dcruz",
    tag: "Bakery items expert",
    image: "./assets/Images/chefs/chef12.jpg",
    bio: "Janee Doe Miller is a really good and top rated chef who serve a sharing her recipes since 4 years, having above 50+ delicious recipes.",
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
