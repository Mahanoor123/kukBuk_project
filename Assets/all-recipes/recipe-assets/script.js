const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const profileUpload = document.getElementById('profile-upload');
const userProfile = document.getElementById('user-profile');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Upload profile picture
profileUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      userProfile.style.backgroundImage = `url(${reader.result})`;
      userProfile.style.backgroundSize = 'cover';
      userProfile.textContent = '';
    };
    reader.readAsDataURL(file);
  }
});
// slider///////////////////////////////////////



let circle = document.querySelector('.circle');
let slider = document.querySelector('.slider');
let list = document.querySelector('.list');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let items = document.querySelectorAll('.list .item');
let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
}
prev.onclick = () => {
    active = active <= 0 ? active : active - 1;
    runCarousel();
}
function runCarousel() {
    prev.style.display = (active == 0) ? 'none' : 'block';
    next.style.display = (active == count - 1) ? 'none' : 'block';


    let old_active = document.querySelector('.item.active');
    if(old_active) old_active.classList.remove('active');
    items[active].classList.add('active');

     leftTransform = width_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
}
runCarousel();


// Set Text on a Circle
let textCircle = circle.innerText.split('');
circle.innerText = '';
textCircle.forEach((value, key) => {
    let newSpan =  document.createElement("span");
    newSpan.innerText = value;
    let rotateThisSpan = (360 / textCircle.length) * (key + 1);
    newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
    circle.appendChild(newSpan); 
});



// <!-- //////////////// All Cards ////////////////////// -->


// Updated Recipe Data with vegetarian property
const recipes = [
  {
    name: 'Delicious Pasta',
    rating: '★★★★★',
    chef: 'Chef John Doe',
    image: './recipe-assets/images/food/1 (2).png',
    isVegetarian: true,
  },
  {
    name: 'Tasty Pizza',
    rating: '★★★★☆',
    chef: 'Chef Jane Smith',
    image: './recipe-assets/images/food/2 (2).png',
    isVegetarian: true,
  },
  {
    name: 'Mouthwatering Burger',
    rating: '★★★★☆',
    chef: 'Chef Mike Lee',
    image: './recipe-assets/images/food/3 (1).png',
    isVegetarian: false,
  },
  {
    name: 'Vegetable Stir Fry',
    rating: '★★★★★',
    chef: 'Chef Anna Kim',
    image: './recipe-assets/images/food/4 (1).png',
    isVegetarian: true,
  },
  {
    name: 'Grilled Chicken',
    rating: '★★★★☆',
    chef: 'Chef Sarah Brown',
    image: './recipe-assets/images/food/grilled.png',
    isVegetarian: false,
  },
  {
    name: 'Hearty Soup',
    rating: '★★★★☆',
    chef: 'Chef Oliver Stone',
    image: 'https://img.freepik.com/free-photo/lentil-soup-with-mixed-ingredients-herbs-white-bowl_114579-3082.jpg?t=st=1735569047~exp=1735572647~hmac=978658f8f46b319cd7ae1920ac45f0cce0fbea256d5d17e801127529f11bda81&w=900',
    isVegetarian: true,
  },
  {
    name: 'Classic Salad',
    rating: '★★★★★',
    chef: 'Chef Emily Green',
    image: './recipe-assets/images/food/breakfast/breakfast (2).png',
    isVegetarian: true,
  },
  {
    name: 'Cheesy Nachos',
    rating: '★★★★☆',
    chef: 'Chef Tony Stark',
    image: './recipe-assets/images/food/pizza/pizza (5).png',
    isVegetarian: true,
  },
  {
    name: 'BBQ Ribs',
    rating: '★★★★☆',
    chef: 'Chef Bruce Wayne',
    image: './recipe-assets/images/food/steak/steak (5).png',
    isVegetarian: false,
  },
  {
    name: 'Spicy Tacos',
    rating: '★★★★★',
    chef: 'Chef Clark Kent',
    image: './recipe-assets/images/food/steak/steak (2).png',
    isVegetarian: false,
  },
  {
    name: 'Margherita Pizza',
    rating: '★★★★☆',
    chef: 'Chef Diana Prince',
    image: './recipe-assets/images/food/pasta/pasta (4).png',
    isVegetarian: true,
  },
  {
    name: 'Stuffed Bell Peppers',
    rating: '★★★★★',
    chef: 'Chef Peter Parker',
    image: './recipe-assets/images/food/bell.png',
    isVegetarian: true,
  },
  {
    name: 'Beef Steak',
    rating: '★★★★☆',
    chef: 'Chef Steve Rogers',
    image: './recipe-assets/images/food/pasta/pasta (1).png',
    isVegetarian: false,
  },
  {
    name: 'Creamy Risotto',
    rating: '★★★★★',
    chef: 'Chef Natasha Romanoff',
    image: './recipe-assets/images/food/pizza/pizza (4).png',
    isVegetarian: true,
  },
  {
    name: 'Fish and Chips',
    rating: '★★★★☆',
    chef: 'Chef Arthur Curry',
    image: 'https://img.freepik.com/premium-photo/fish-chips-with-french-fries_1339-77069.jpg?w=900',
    isVegetarian: false,
  },
];


// Constants
const recipeGrid = document.querySelector('.recipe-grid');
const filterBtn = document.getElementById('filter-btn');
const searchInput = document.getElementById('search');
const itemsPerPage = 12; // 4 rows x 3 cards per row
let currentPage = 1;
let filteredRecipes = [...recipes];
let currentFilter = 'all';

// Render recipe cards
function renderRecipes(recipesToRender) {
  recipeGrid.innerHTML = ''; // Clear the grid
  recipesToRender.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.classList.add('hero-card');
    card.innerHTML = `
      <div class="left-section">
          <div class="recipe-name">${recipe.name}</div>
          <div class="rating">${recipe.rating}</div>
          <div class="chef-name">By ${recipe.chef}</div>
          <button class="view-recipe-btn"><a href="./recipe.html">View Recipe</a></button>
      </div>
      <div class="right-section">
          <div class="dish-ring">
              <img id="dish-image-${index}" src="${recipe.image}" alt="${recipe.name}">
          </div>
      </div>
    `;
    recipeGrid.appendChild(card);
  });
}

// Update pagination
function renderPagination(totalItems) {
  const paginationWrapper = document.querySelector('.pagination');
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationWrapper.innerHTML = ''; // Clear previous buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('pagination-btn');
    if (i === currentPage) button.classList.add('active');
    button.addEventListener('click', () => {
      currentPage = i;
      displayPage();
    });
    paginationWrapper.appendChild(button);
  }
}

// Display recipes for the current page
function displayPage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  renderRecipes(filteredRecipes.slice(start, end));
  renderPagination(filteredRecipes.length);
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText) &&
    (currentFilter === 'all' ||
      (currentFilter === 'vegetarian' && recipe.isVegetarian) ||
      (currentFilter === 'non-vegetarian' && !recipe.isVegetarian))
  );
  currentPage = 1;
  displayPage();
});

// Filter button functionality
filterBtn.addEventListener('click', () => {
  const filterOptions = ['all', 'vegetarian', 'non-vegetarian'];
  const currentIndex = filterOptions.indexOf(currentFilter);
  currentFilter = filterOptions[(currentIndex + 1) % filterOptions.length];

  filterBtn.textContent = `Filter: ${currentFilter
    .replace('-', ' ')
    .toUpperCase()}`;
  filteredRecipes = recipes.filter(
    (recipe) =>
      currentFilter === 'all' ||
      (currentFilter === 'vegetarian' && recipe.isVegetarian) ||
      (currentFilter === 'non-vegetarian' && !recipe.isVegetarian)
  );
  currentPage = 1;
  displayPage();
});

// Initial render
displayPage();
