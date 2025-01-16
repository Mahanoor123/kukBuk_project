document.addEventListener('DOMContentLoaded', function () {
  const text = document.getElementById('text');
  const inputField = document.getElementById('image');
  const filePreview = document.getElementById('filePreview');
  const changeButton = document.getElementById('changeButton');

  text.addEventListener('click', function () {
    inputField.click();
  });

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



// -------------------  recipie title -------------------------------   
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('recipeTitle')

  input.addEventListener('input', function () {
    let value = input.value

    if (value.length > 20) {
      alert('RecipeTitle should be in 20 letters')
    }

    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }

    input.value = value
  })
})


// -------------------  recipie checkbox -------------------------------   
document.addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('.form-check-input')

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkboxes.forEach(cb => {
          if (cb !== this) {
            cb.checked = false
          }
        })
      }
    })
  })
})

// ---------------------------------------------------------------------------------------------
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
  <i class="fas fa-edit" style="width: 24px; height: 24px;"></i>`;
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
  <i class="fas fa-trash-alt" style="width: 24px; height: 24px;"></i>`;
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

// ---------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const stepContainer = document.getElementById('stepContainer')
  const stepInput = document.getElementById('stepInput')
  const addStepBtn = document.getElementById('addStepBtn')
  const stepsList = document.getElementById('stepsList')
  let stepCount = 0
  let totalCharacterCount = 0

  addStepBtn.addEventListener('click', function () {
    const stepText = stepInput.value.trim()

    if (stepText === '') {
      alert('Please add a step before clicking the add button.')
      return
    }

    if (stepCount >= 5) {
      alert('You have reached the maximum number of 5 steps.')
      return
    }

    if (totalCharacterCount + stepText.length > 300) {
      alert(
        'You have exceeded the length of 300 characters kindly adjust your content in it. For that you can edit or delete by clicking the buttons in the input field.'
      )
      return
    }

    addStep(stepText)
    stepInput.value = '' // Clear the input field after adding the step
  })

  stepInput.addEventListener('input', function () {
    if (stepInput.value.length >= 100) {
      alert('Move to a new line by pressing the "+" button.')
    }
  })

  function addStep(stepText) {
    const stepItem = document.createElement('div')
    stepItem.classList.add(
      'input-group',
      // 'mt-lg-2',
      'p-2',
      'mb-2',
      'Ingredient',
      'textarea'
    )

    const stepField = document.createElement('textarea')
    stepField.type = 'text'
    stepField.classList.add('form-control', 'edit')
    stepField.value = stepText
    stepField.readOnly = true

    // Create the edit button using Font Awesome
    const editBtn = document.createElement('span');
    editBtn.innerHTML = `
  <i class="fas fa-edit" ></i>
`;
    editBtn.classList.add('editimg');
    editBtn.addEventListener('click', function () {
      if (stepField.readOnly) {
        stepField.readOnly = false;
        stepField.focus();
      } else {
        stepField.readOnly = true;
      }
    });

    // Create the delete button using Font Awesome
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = `
  <i class="fas fa-trash-alt" ></i>
`;
    deleteBtn.classList.add('delimg', 'ms-4', 'me-3');
    deleteBtn.addEventListener('click', function () {
      stepsList.removeChild(stepItem);
      stepCount--;
      totalCharacterCount -= stepField.value.length;
      reorderSteps();
    });


    stepItem.appendChild(stepField)
    stepItem.appendChild(editBtn)
    stepItem.appendChild(deleteBtn)

    stepsList.appendChild(stepItem)
    stepCount++
    totalCharacterCount += stepText.length

    reorderSteps()
  }

  function reorderSteps() {
    const stepInputs = stepsList.querySelectorAll('.Ingredient input')
    stepInputs.forEach((input, index) => {
      input.placeholder = `Steps ... `
    })
  }
})

// --------------------------------- additional Btn-------------------------------------

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

// ---------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  // yahn form clear ho jai ga agr koi is page main wapis ata hy tooo
  const form = document.querySelector('form')
  form.clear();

  document.getElementById('submitBtn').addEventListener('click', submitbtn)
  document.querySelector('.btn-close').addEventListener('click', closePopup)
})

function submitbtn() {
  console.log('Submit button clicked') // Log to check if the function is called
  const inputField = document.getElementById('image')
  const recipeTitle = document.getElementById('recipeTitle')
  const floatingTextarea2 = document.getElementById('floatingTextarea2')
  const servingInput = document.querySelector('input[placeholder="4 persons "]')
  const preparationInput = document.querySelector(
    'input[placeholder="30 mins"]'
  )
  const checkboxes = document.querySelectorAll('.form-check-input')
  const stepsList = document.getElementById('stepsList')

  const ingredientInputs = document.querySelectorAll(
    '#ingredientList input[type="text"]'
  )
  const stepInputs = document.querySelectorAll('#stepsList input[type="text"]')

  // Validate all required fields
  if (
    inputField.files.length === 0 ||
    recipeTitle.value.trim() === '' ||
    floatingTextarea2.value.trim() === '' ||
    servingInput.value.trim() === '' ||
    preparationInput.value.trim() === '' ||
    !Array.from(checkboxes).some(checkbox => checkbox.checked) ||
    stepsList.children.length === 0
  ) {
    alert('Please fill the form completely before submitting.')
    console.log('Form validation failed')
    return
  }


  //--------------------------------local storagemain save ho raha hy -----------------------------
  // Validate all required fields
  if (
    inputField.files.length === 0 ||
    recipeTitle.value.trim() === '' ||
    floatingTextarea2.value.trim() === '' ||
    servingInput.value.trim() === '' ||
    preparationInput.value.trim() === '' ||
    !Array.from(checkboxes).some(checkbox => checkbox.checked) ||
    stepsList.children.length === 0
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



  //--------------- Show the popup --------------------
  const popupcontainer = document.getElementById('backgroundpopupbox')
  popupcontainer.style.display = 'block'
  console.log('Popup shown')

  const tickImage = document.getElementById('tickImage')
  setTimeout(function () {
    tickImage.style.display = 'block'
  }, 3)
  
}



function closePopup() {
  const popupcontainer = document.getElementById('backgroundpopupbox')
  popupcontainer.style.display = 'none'
  window.location.href = "./recipiemain.html"

}


