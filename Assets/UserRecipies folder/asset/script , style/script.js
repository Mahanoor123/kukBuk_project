//xxxxxxxxxxxxxxxxxxxxx Variables Definition xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// const image = document.getElementById('image');
// const filePreview = document.getElementById('filePreview');
// const text = document.getElementById('text');
// const changeButton = document.getElementById('changeButton');

// const addIngredientBtn = document.getElementById('addIngredientBtn');
// const ingredientInput = document.getElementById('ingredientInput');
// const ingredientList = document.getElementById('ingredientList');

const input = document.getElementById('recipeTitle');
const checkboxes = document.querySelectorAll('.form-check-input');

const servingInput = document.querySelector('[placeholder="4 persons "]');
const preparationInput = document.querySelector('[placeholder="30 mins"]');
const additionalBtn = document.getElementById('additionalBtn');
const additionalContent = document.getElementById('additionalContent');

//xxxxxxxxxxxxxxxxxxxxx 1. File Upload Functionality xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
document.addEventListener('DOMContentLoaded', function () {
  const text = document.getElementById('text');
  const inputField = document.getElementById('image');
  const filePreview = document.getElementById('filePreview');
  const changeButton = document.getElementById('changeButton');

  text.addEventListener('click', function () { inputField.click(); });

  inputField.addEventListener('change', function () {
    const file = inputField.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileURL = e.target.result;
      let fileElement;

      if (file.type.startsWith('image/')) {
        fileElement = document.createElement('img');
        fileElement.src = fileURL;
        fileElement.style.maxWidth = '100%';
        fileElement.style.height = 'auto';
      } else if (file.type.startsWith('video/')) {
        fileElement = document.createElement('video');
        fileElement.src = fileURL;
        fileElement.controls = true;
        fileElement.style.maxWidth = '100%';
        fileElement.style.height = 'auto';
      } else {
        fileElement = document.createElement('p');
        fileElement.textContent = 'Unsupported file type.';
      }

      filePreview.innerHTML = '';
      filePreview.appendChild(fileElement);
      text.style.display = 'none';
      changeButton.style.display = 'inline-block';

      // Save the base64 encoded image to localStorage
      const formData = JSON.parse(localStorage.getItem('formData')) || {};
      formData.file = fileURL; // Use base64 encoded image
      localStorage.setItem('formData', JSON.stringify(formData));
    };

    reader.readAsDataURL(file);
  });

  changeButton.addEventListener('click', function () {
    inputField.click();
  });
});


//xxxxxxxxxxxxxxxxxxxxx 2. Recipe Title Validation xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
input.addEventListener('input', function () {
  let value = input.value;

  if (value.length > 20) {
    alert('Recipe Title should not exceed 20 characters.');
    input.value = value.substring(0, 20); // Auto-trim kar dena
    return;
  }

  // Capitalize the first letter
  if (value.length > 0) {
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  input.value = value;
});


//xxxxxxxxxxxxxxxxxxxxx 3. Checkbox Behavior xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});


//xxxxxxxxxxxxxxxxxxxxx 4. Ingredient Adding Functionality xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
document.addEventListener('DOMContentLoaded', function () {
  const ingredientInput = document.getElementById('ingredientInput')
  const addIngredientBtn = document.getElementById('addIngredientBtn')
  const ingredientList = document.getElementById('ingredientList')

  addIngredientBtn.addEventListener('click', function () {
    const ingredientText = ingredientInput.value.trim()

    if (ingredientText === '') {
      alert('Please add an ingredient before clicking the add button.')
      return // Prevent adding empty ingredients
    }

    // Create a new container for ingredient and quantity
    const container = document.createElement('div')
    container.classList.add(
      'd-flex',
      'ingre',
      'justify-content-start',
      'align-items-start',
      'mb-2'
    )

    // Create the ingredient container
    const ingredientContainer = document.createElement('div')
    ingredientContainer.classList.add(
      'input-group',
      'p-2',
      'ms-lg-5',
      'mb-2',
      'm-2',
      'textarea1',
      'Ingredient'
    )

    // Create the input field for the ingredient
    const ingredientField = document.createElement('input')
    ingredientField.type = 'text'
    ingredientField.classList.add('form-control', 'edit')
    ingredientField.value = ingredientText
    ingredientField.readOnly = true

    // Create the edit button for ingredient using Font Awesome
    const editBtnIngredient = document.createElement('span');
    editBtnIngredient.innerHTML = `
  <i class="fas fa-edit"></i>`;
    editBtnIngredient.classList.add('edit-btn-svg-container');
    editBtnIngredient.addEventListener('click', function () {
      if (ingredientField.readOnly) {
        ingredientField.readOnly = false;
        ingredientField.focus();
      } else {
        ingredientField.readOnly = true;
      }
    });

    // Create the delete button for ingredient using Font Awesome
    const deleteBtnIngredient = document.createElement('span');
    deleteBtnIngredient.innerHTML = `
  <i class="fas fa-trash-alt"></i>`;
    deleteBtnIngredient.classList.add('delimg', 'ms-4', 'me-3');
    deleteBtnIngredient.addEventListener('click', function () {
      ingredientList.removeChild(container);
    });


    // Append elements to the ingredient container
    ingredientContainer.appendChild(ingredientField)
    ingredientContainer.appendChild(editBtnIngredient)
    ingredientContainer.appendChild(deleteBtnIngredient)

    // Create the quantity container
    const quantityContainer = document.createElement('div')
    quantityContainer.classList.add(
      'input-group',
      'p-2',
      'ms-lg-5',
      'mb-3',
      'm-2',
      'textarea1',
      'Ingredient'
    )

    // Create the input field for the quantity
    const quantityField = document.createElement('input')
    quantityField.type = 'text'
    quantityField.classList.add('form-control', 'edit')
    quantityField.value = 'Quantity : 2 / 3'
    quantityField.readOnly = true

    // Create the edit button for quantity using Font Awesome
    const editBtnQuantity = document.createElement('span');
    editBtnQuantity.innerHTML = `
  <i class="fas fa-edit" ></i>
`;
    editBtnQuantity.classList.add('editimg');
    editBtnQuantity.addEventListener('click', function () {
      if (quantityField.readOnly) {
        quantityField.readOnly = false;
        quantityField.focus();
      } else {
        quantityField.readOnly = true;
      }
    });

    // Create the delete button for quantity using Font Awesome
    const deleteBtnQuantity = document.createElement('span');
    deleteBtnQuantity.innerHTML = `
    <i class="fas fa-trash-alt" ></i>
    `;
    deleteBtnQuantity.classList.add('delimg', 'ms-4', 'me-3');
    deleteBtnQuantity.addEventListener('click', function () {
      ingredientList.removeChild(container);
    });

    // Append elements to the quantity container
    quantityContainer.appendChild(quantityField)
    quantityContainer.appendChild(editBtnQuantity)
    quantityContainer.appendChild(deleteBtnQuantity)

    // Append the ingredient and quantity containers to the main container
    container.appendChild(ingredientContainer)
    container.appendChild(quantityContainer)

    // Append the main container to the list
    ingredientList.appendChild(container)

    // Clear the input field
    ingredientInput.value = ''
  })
})


//xxxxxxxxxxxxxxxxxxxxx 5. Additional Button Functionality xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
document.addEventListener('DOMContentLoaded', function () {
  const additionalBtn = document.getElementById('additionalBtn')
  const additionalContent = document.getElementById('additionalContent')

  additionalBtn.addEventListener('click', function () {
    const newContent = document.createElement('div')
    newContent.classList.add(
      'pt-5',
      'pt-lg-5',
      'justify-content-start',
      'align-items-start'
    )

    const newHeading = document.createElement('input')
    newHeading.type = 'text'
    newHeading.classList.add('form-control', 'h2')
    newHeading.style.width = '75%'
    newHeading.style.border = 'none'
    newHeading.placeholder = 'Add Heading'

    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.classList.add('form-control', 'mt-3')
    newInput.placeholder = 'Anything you want to add'
    newInput.required = true

    newContent.appendChild(newHeading)
    newContent.appendChild(newInput)

    additionalContent.appendChild(newContent)
  })
})


//xxxxxxxxxxxxxxxxxxxxx 6. Submit Button Validation xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
document.addEventListener('DOMContentLoaded', function () {
  // Form will be cleared when revisiting the page
  const form = document.querySelector('form');
  form.reset();

  document.getElementById('submitBtn').addEventListener('click', submitbtn);
  document.querySelector('.btn-close').addEventListener('click', closePopup);
});

function submitbtn() {
  console.log('Submit button clicked'); // Log to check if the function is called
  const inputField = document.getElementById('image');
  const recipeTitle = document.getElementById('recipeTitle');
  const floatingTextarea2 = document.getElementById('floatingTextarea2');
  const servingInput = document.querySelector('input[placeholder="4 persons "]');
  const preparationInput = document.querySelector('input[placeholder="30 mins"]');
  const checkboxes = document.querySelectorAll('.form-check-input');

  // Validate all required fields
  if (
    inputField.files.length === 0 ||
    recipeTitle.value.trim() === '' ||
    floatingTextarea2.value.trim() === '' ||
    servingInput.value.trim() === '' ||
    preparationInput.value.trim() === '' ||
    !Array.from(checkboxes).some(checkbox => checkbox.checked)
  ) {
    alert('Please fill the form completely before submitting.');
    console.log('Form validation failed');
    return;
  }

  const formData = {
    file: JSON.parse(localStorage.getItem('formData'))?.file || 'No file selected', // Retrieve from localStorage
    recipeTitle: recipeTitle.value,
    description: floatingTextarea2.value,
    servings: servingInput.value,
    preparationTime: preparationInput.value,
    categories: Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.nextElementSibling.innerText)
  };

  let userCollection = JSON.parse(localStorage.getItem('userCollection')) || [];
  userCollection.push(formData);
  localStorage.setItem('userCollection', JSON.stringify(userCollection));
  console.log('Form data saved to localStorage:', formData);


  
  // Show the popup
  const popupcontainer = document.getElementById('backgroundpopupbox');
  popupcontainer.style.display = 'block';
  setTimeout(function () {
    document.getElementById('tickImage').style.display = 'block';
  }, 1000);
}

function closePopup() {
  const popupcontainer = document.getElementById('backgroundpopupbox');
  popupcontainer.style.display = 'none';
  window.location.href = "./recipiemain.html";
}
