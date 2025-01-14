document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav_links').classList.toggle('active');
});


// -------------------------------------------------------------------------------------recipi cards

const mealData = [
  {
    imgSrc:
      'https://i.pinimg.com/736x/56/b2/44/56b244253686e5800913f49fdd281c70.jpg',
    title: 'Strawberry Cheese Cake',
    category: 'Dessert',
    description:
      `The flavors of mediterranean are cooked up to 30 minutes with sause. 
Lorem ipsum dolor sit amet, amet, conse consectetur mollitia ipsam assumenda corporis fugiat.`
  },
  {
    imgSrc:
      'https://i.pinimg.com/736x/a0/df/a6/a0dfa6fd2753ec8279c6a275b024422f.jpg',
    title: 'Chicken Skewers',
    category: 'Main Course',
    description:
      `Delicious chicken skewers ready in just 15 minutes with sause. 
Lorem ipsum dolor sit amet, consectetue consectetue  mollitia ipsam assumenda corporis fugiat.`
  },

  {
    imgSrc:
      'https://i.pinimg.com/736x/4f/bf/3a/4fbf3ac33370e5edc8ed203d90606625.jpg',
    title: 'Grilled Salmon',
    category: 'Main Course',
    description:
      `Fresh grilled salmon with a hint of lemon have a neutral or mild smell. 
Lorem ipsum dolor sit amet, consectetur adip ipsam assumenda corporis fugiat.`
  },
  {
    imgSrc:
      'https://i.pinimg.com/736x/82/ee/04/82ee04d02647ce6f9138b9ff260a9f1f.jpg',
    title: 'Vegan Salad',
    category: 'Salad',
    description:
      `A healthy and fresh vegan salad that is free from any animal-derived ingredients. 
Lorem ipsum dolor sit amet, olestiae mollitia ipsam assumenda corporis fugiat.`
  },
  {
    imgSrc:
      'https://i.pinimg.com/736x/91/60/2f/91602f6e1f6e0146df4f22e49fd97ed0.jpg',
    title: 'Chocolate Browne',
    category: 'Dessert',
    description:
      `Rih and fudgy chocolate brownies with more butter, chocolate, egg yolks in brownie. 
Lorem ipsum dolor sit amet,  ipsam assumenda corporis fugiat.`
  },

  {
    imgSrc:
      'https://i.pinimg.com/736x/d6/8a/be/d68abeeccb103fdff55b6f662650a63c.jpg',
    title: 'Noddles',
    category: 'Meal',
    description:
      `A staple food mae from unleavened dough that is rolled flat and cut into long strips or strings.  
Lorem ipsum dolor sit amet,  molestiae.`
  }
]

const container = document.getElementById('mealCardsContainer')

function createCard (data) {
  const card = document.createElement('div')
  card.className = 'Meal-Ctegory-card card mt-lg-5 m-lg-2 m-md-2 m-1 px-lg-4 p-1'

  card.innerHTML = `
        <div class="ms-3 m-1 meal-card-imgdiv">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        </div>
        <img src="${data.imgSrc}" class="meal-card-img" alt="img">

        <div class="mt-lg-3 m-lg-3 m-md-3 p-2  ">
           <h4 class="card-title fw-bold pt-5 mt-3 mealcardheading">❆ ${data.title} ❆</h4>
            <div class="custom-underline"></div>
            <p class="spanpara pt-3">${data.category}</p>
            <p class="lead cardpara pt-3 mb-2">${data.description}</p>
        </div>

        <div class="d-flex justify-content-between mt-4  mt-lg-2 mt-md-2 p-1 mb-2  align-items-center">
            <div class=" ">
                <button type="button" class="btn p-2 px-lg-4 mx-md-4  font text-light button ms-1" >View Recipe</button>
            </div>
            <div class="sidediv ms-1  p-0">
                <span>
                    <svg id="heartSvg" class="heartSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path id="heartPath" fill="#e81409" fill-rule="evenodd"
                            d="M8.753 2.247L8 3l-.753-.753A4.243 4.243 0 0 0 1.25 8.25l5.69 5.69L8 15l1.06-1.06l5.69-5.69a4.243 4.243 0 0 0-5.997-6.003M8 12.879l5.69-5.69a2.743 2.743 0 0 0-3.877-3.881l-.752.753L8 5.12L6.94 4.06l-.753-.752v-.001A2.743 2.743 0 0 0 2.31 7.189L8 12.88Z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="me-lg-2 me-md-2 spanpara">Like</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="heartSvg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="none" stroke="#e81409" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 4H5a2 2 0 0 0-2 2v15l3.467-2.6a2 2 0 0 1 1.2-.4H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
                    </svg>
                </span>
                <span class="me-lg-2 me-md-2 spanpara">234</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="heartSvg" width="16" height="16" viewBox="0 0 48 48">
                        <g fill="none" stroke="#e81409" stroke-linejoin="round" stroke-width="4">
                            <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                            <path stroke-linecap="round" d="M24.008 12v12.01l8.479 8.48" />
                        </g>
                    </svg>
                </span>
                <span class="me-lg-2 me-md-2 spanpara">3 hrs ago</span>
            </div>
        </div>
    `
  return card
}

function displayCards (data) {
  container.innerHTML = ''
  data.forEach(item => {
    container.appendChild(createCard(item))
  })
}
displayCards(mealData)

// function filterCards (category) {
//   const filteredData = mealData.filter(item => item.category === category)
//   displayCards(filteredData)
// }
