// ---------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const text = document.getElementById('text')
  const inputField = document.getElementById('inputFieldText')
  const filePreview = document.getElementById('filePreview')
  const changeButton = document.getElementById('changeButton')

  text.addEventListener('click', function () {
    inputField.click()
  })

  inputField.addEventListener('change', function () {
    const file = inputField.files[0]
    const fileURL = URL.createObjectURL(file)
    let fileElement

    if (file.type.startsWith('image/')) {
      fileElement = document.createElement('img')
      fileElement.src = fileURL
      fileElement.style.maxWidth = '100%'
      fileElement.style.height = 'auto'
    } else if (file.type.startsWith('video/')) {
      fileElement = document.createElement('video')
      fileElement.src = fileURL
      fileElement.controls = true
      fileElement.style.maxWidth = '100%'
      fileElement.style.height = 'auto'
    } else {
      fileElement = document.createElement('p')
      fileElement.textContent = 'Unsupported file type.'
    }

    // Clear the previous content and add the new file element
    filePreview.innerHTML = ''
    filePreview.appendChild(fileElement)

    // Hide the "Add Image / Video" text
    text.style.display = 'none'

    // Show the "Change" button
    changeButton.style.display = 'inline-block'
  })

  changeButton.addEventListener('click', function () {
    inputField.click()
  })
})

////////////////////////   recipietitle
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

// ---------------------------------------------------------------------------------------------
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

    // Create the edit button using SVG
    const editBtnIngredient = document.createElement('span')
    editBtnIngredient.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="#635C5F" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/>
          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/>
        </g>
      </svg>
    `
    editBtnIngredient.classList.add('edit-btn-svg-container')
    editBtnIngredient.addEventListener('click', function () {
      if (ingredientField.readOnly) {
        ingredientField.readOnly = false
        ingredientField.focus()
      } else {
        ingredientField.readOnly = true
      }
    })

    // Create the delete button using SVG
    const deleteBtnIngredient = document.createElement('span')
    deleteBtnIngredient.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 56">
        <path fill="#635C5F" d="M46.035 49.574c4.899 0 7.36-2.414 7.36-7.265V13.69c0-4.851-2.461-7.265-7.36-7.265H25.668c-2.742 0-5.11.703-7.031 2.742L4.832 23.512c-1.523 1.57-2.226 2.976-2.226 4.453c0 1.453.68 2.883 2.226 4.453L18.66 46.691c1.946 2.016 4.29 2.86 7.032 2.86Zm-5.46-11.203c-.563 0-1.055-.21-1.454-.586l-6.844-6.89l-6.867 6.89c-.398.375-.89.586-1.453.586c-1.148 0-2.11-.937-2.11-2.086c0-.539.235-1.054.634-1.476l6.82-6.844l-6.82-6.82c-.399-.422-.633-.938-.633-1.477c0-1.172.96-2.133 2.11-2.133c.538 0 1.054.211 1.476.633l6.843 6.844l6.82-6.844c.423-.422.938-.633 1.477-.633c1.172 0 2.11.961 2.11 2.133c0 .54-.211 1.055-.633 1.477l-6.82 6.82l6.82 6.844c.422.422.633.937.633 1.476c0 1.149-.961 2.086-2.11 2.086"/>
      </svg>
    `
    deleteBtnIngredient.classList.add('delimg', 'ms-4', 'me-3')
    deleteBtnIngredient.addEventListener('click', function () {
      ingredientList.removeChild(container)
    })

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

    // Create the edit button for quantity
    const editBtnQuantity = document.createElement('span')
    editBtnQuantity.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="#635C5F" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/>
          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/>
        </g>
      </svg>
    `
    editBtnQuantity.classList.add('editimg')
    editBtnQuantity.addEventListener('click', function () {
      if (quantityField.readOnly) {
        quantityField.readOnly = false
        quantityField.focus()
      } else {
        quantityField.readOnly = true
      }
    })

    // Create the delete button for quantity
    const deleteBtnQuantity = document.createElement('span')
    deleteBtnQuantity.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 56">
        <path fill="#635C5F" d="M46.035 49.574c4.899 0 7.36-2.414 7.36-7.265V13.69c0-4.851-2.461-7.265-7.36-7.265H25.668c-2.742 0-5.11.703-7.031 2.742L4.832 23.512c-1.523 1.57-2.226 2.976-2.226 4.453c0 1.453.68 2.883 2.226 4.453L18.66 46.691c1.946 2.016 4.29 2.86 7.032 2.86Zm-5.46-11.203c-.563 0-1.055-.21-1.454-.586l-6.844-6.89l-6.867 6.89c-.398.375-.89.586-1.453.586c-1.148 0-2.11-.937-2.11-2.086c0-.539.235-1.054.634-1.476l6.82-6.844l-6.82-6.82c-.399-.422-.633-.938-.633-1.477c0-1.172.96-2.133 2.11-2.133c.538 0 1.054.211 1.476.633l6.843 6.844l6.82-6.844c.423-.422.938-.633 1.477-.633c1.172 0 2.11.961 2.11 2.133c0 .54-.211 1.055-.633 1.477l-6.82 6.82l6.82 6.844c.422.422.633.937.633 1.476c0 1.149-.961 2.086-2.11 2.086"/>
      </svg>
    `
    deleteBtnQuantity.classList.add('delimg', 'ms-4', 'me-3')
    deleteBtnQuantity.addEventListener('click', function () {
      ingredientList.removeChild(container)
    })

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

  function addStep (stepText) {
    const stepItem = document.createElement('div')
    stepItem.classList.add(
      'input-group',
      'mt-lg-1',
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

    // Create the edit button using SVG
    const editBtn = document.createElement('span')
    editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="#635C5F" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/>
          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/>
        </g>
      </svg>
    `
    editBtn.classList.add('editimg')
    editBtn.addEventListener('click', function () {
      if (stepField.readOnly) {
        stepField.readOnly = false
        stepField.focus()
      } else {
        stepField.readOnly = true
      }
    })

    // Create the delete button using SVG
    const deleteBtn = document.createElement('span')
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 56 56">
        <path fill="#635C5F" d="M46.035 49.574c4.899 0 7.36-2.414 7.36-7.265V13.69c0-4.851-2.461-7.265-7.36-7.265H25.668c-2.742 0-5.11.703-7.031 2.742L4.832 23.512c-1.523 1.57-2.226 2.976-2.226 4.453c0 1.453.68 2.883 2.226 4.453L18.66 46.691c1.946 2.016 4.29 2.86 7.032 2.86Zm-5.46-11.203c-.563 0-1.055-.21-1.454-.586l-6.844-6.89l-6.867 6.89c-.398.375-.89.586-1.453.586c-1.148 0-2.11-.937-2.11-2.086c0-.539.235-1.054.634-1.476l6.82-6.844l-6.82-6.82c-.399-.422-.633-.938-.633-1.477c0-1.172.96-2.133 2.11-2.133c.538 0 1.054.211 1.476.633l6.843 6.844l6.82-6.844c.423-.422.938-.633 1.477-.633c1.172 0 2.11.961 2.11 2.133c0 .54-.211 1.055-.633 1.477l-6.82 6.82l6.82 6.844c.422.422.633.937.633 1.476c0 1.149-.961 2.086-2.11 2.086"/>
      </svg>
    `
    deleteBtn.classList.add('delimg', 'ms-4', 'me-3')
    deleteBtn.addEventListener('click', function () {
      stepsList.removeChild(stepItem)
      stepCount--
      totalCharacterCount -= stepField.value.length
      reorderSteps()
    })

    stepItem.appendChild(stepField)
    stepItem.appendChild(editBtn)
    stepItem.appendChild(deleteBtn)

    stepsList.appendChild(stepItem)
    stepCount++
    totalCharacterCount += stepText.length

    reorderSteps()
  }

  function reorderSteps () {
    const stepInputs = stepsList.querySelectorAll('.Ingredient input')
    stepInputs.forEach((input, index) => {
      input.placeholder = `Steps ... `
    })
  }
})

// ---------------------------------------------------------------------------------------------

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

document.getElementById('exampleInput').addEventListener('blur', function () {
  this.classList.add('form-control-blur')
})

document.addEventListener('DOMContentLoaded', function () {
  // yahn form clear ho jai ga agr koi is page main wapis ata hy tooo
  const form = document.querySelector('form')
  form.reset()

  document.getElementById('submitBtn').addEventListener('click', submitbtn)
  document.querySelector('.btn-close').addEventListener('click', closePopup)
})

function submitbtn () {
  console.log('Submit button clicked') // Log to check if the function is called
  const inputField = document.getElementById('inputFieldText')
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

  ////////////// console per form fill ho jai ga yahn
  console.log('Form filled values:')
  console.log('Image/Video:', inputField.files[0].name)
  console.log('Recipe Title:', recipeTitle.value)
  console.log('Ingredients:')
  ingredientInputs.forEach((ingredientInput, index) => {
    console.log(`Ingredient ${index + 1}:`, ingredientInput.value)
  })
  console.log('Cooking Steps:')
  stepInputs.forEach((stepInput, index) => {
    console.log(`Step ${index + 1}:`, stepInput.value)
  })
  console.log('Description:', floatingTextarea2.value)
  console.log('Servings:', servingInput.value)
  console.log('Preparation Time:', preparationInput.value)
  console.log('Categories:')
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      console.log(
        `Category ${index + 1}:`,
        checkbox.nextElementSibling.innerText
      )
    }
  })

  ///////////// Show the popup
  const popupcontainer = document.getElementById('backgroundpopupbox')
  popupcontainer.style.display = 'block'
  console.log('Popup shown')

  const tickImage = document.getElementById('tickImage')
  setTimeout(function () {
    tickImage.style.display = 'block'
  }, 3)
}

function closePopup () {
  console.log('Close button clicked')
  const popupcontainer = document.getElementById('backgroundpopupbox')
  popupcontainer.style.display = 'none'
  window.location.href = "./recipiemain.html"
  console.log('Popup closed and redirected to recipiemain.html')
}


