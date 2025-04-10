document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const cardForm = document.getElementById('card-form');
  const completedState = document.getElementById('completed-state');
  const continueBtn = document.querySelector('.btn-continue');
  
  // Get input elements
  const cardNameInput = document.getElementById('card-name');
  const cardNumberInput = document.getElementById('card-number');
  const expiryMonthInput = document.getElementById('expiry-month');
  const expiryYearInput = document.getElementById('expiry-year');
  const cardCvcInput = document.getElementById('card-cvc');
  
  // Get display elements
  const cardNumberDisplay = document.querySelector('.card-number-display');
  const cardNameDisplay = document.querySelector('.card-name-display');
  const cardExpiryDisplay = document.querySelector('.card-expiry-display');
  const cardCvcDisplay = document.querySelector('.card-cvc-display');
  
  // Get error message elements
  const nameError = document.getElementById('name-error');
  const numberError = document.getElementById('number-error');
  const monthError = document.getElementById('month-error');
  const yearError = document.getElementById('year-error');
  const cvcError = document.getElementById('cvc-error');
  
  // Update card display as user types
  cardNameInput.addEventListener('input', function() {
    cardNameDisplay.textContent = this.value || 'Jane Appleseed';
  });
  
  cardNumberInput.addEventListener('input', function(e) {
    // Format card number with spaces
    let value = this.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    this.value = formattedValue;
    cardNumberDisplay.textContent = formattedValue || '0000 0000 0000 0000';
  });
  
  // Only allow numbers for card number input
  cardNumberInput.addEventListener('keypress', function(e) {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });
  
  // Only allow numbers for expiry month and year
  expiryMonthInput.addEventListener('keypress', restrictToNumbers);
  expiryYearInput.addEventListener('keypress', restrictToNumbers);
  cardCvcInput.addEventListener('keypress', restrictToNumbers);
  
  // Helper function to restrict to numbers
  function restrictToNumbers(e) {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }
  
  // Update expiry display
  expiryMonthInput.addEventListener('input', updateExpiryDisplay);
  expiryYearInput.addEventListener('input', updateExpiryDisplay);
  
  function updateExpiryDisplay() {
    const month = expiryMonthInput.value.padStart(2, '0');
    const year = expiryYearInput.value.padStart(2, '0');
    cardExpiryDisplay.textContent = `${month}/${year}`;
  }
  
  // Update CVC display
  cardCvcInput.addEventListener('input', function() {
    cardCvcDisplay.textContent = this.value || '000';
  });
  
  // Form validation and submission
  cardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate card name
    if (!cardNameInput.value.trim()) {
      nameError.textContent = "Can't be blank";
      cardNameInput.classList.add('error');
      isValid = false;
    } else {
      nameError.textContent = '';
      cardNameInput.classList.remove('error');
    }
    
    // Validate card number
    const cardNumberValue = cardNumberInput.value.replace(/\s/g, '');
    if (!cardNumberValue) {
      numberError.textContent = "Can't be blank";
      cardNumberInput.classList.add('error');
      isValid = false;
    } else if (!/^\d{16}$/.test(cardNumberValue)) {
      numberError.textContent = "Wrong format, numbers only";
      cardNumberInput.classList.add('error');
      isValid = false;
    } else {
      numberError.textContent = '';
      cardNumberInput.classList.remove('error');
    }
    
    // Validate expiry month
    if (!expiryMonthInput.value) {
      monthError.textContent = "Can't be blank";
      expiryMonthInput.classList.add('error');
      isValid = false;
    } else if (!/^\d{1,2}$/.test(expiryMonthInput.value) || parseInt(expiryMonthInput.value) < 1 || parseInt(expiryMonthInput.value) > 12) {
      monthError.textContent = "Invalid month";
      expiryMonthInput.classList.add('error');
      isValid = false;
    } else {
      monthError.textContent = '';
      expiryMonthInput.classList.remove('error');
    }
    
    // Validate expiry year
    if (!expiryYearInput.value) {
      yearError.textContent = "Can't be blank";
      expiryYearInput.classList.add('error');
      isValid = false;
    } else if (!/^\d{2}$/.test(expiryYearInput.value)) {
      yearError.textContent = "Invalid year";
      expiryYearInput.classList.add('error');
      isValid = false;
    } else {
      yearError.textContent = '';
      expiryYearInput.classList.remove('error');
    }
    
    // Validate CVC
    if (!cardCvcInput.value) {
      cvcError.textContent = "Can't be blank";
      cardCvcInput.classList.add('error');
      isValid = false;
    } else if (!/^\d{3}$/.test(cardCvcInput.value)) {
      cvcError.textContent = "Invalid CVC";
      cardCvcInput.classList.add('error');
      isValid = false;
    } else {
      cvcError.textContent = '';
      cardCvcInput.classList.remove('error');
    }
    
    // If all validation passes, show completed state
    if (isValid) {
      cardForm.classList.remove('active');
      completedState.classList.add('active');
    }
  });
  
  // Continue button click handler
  continueBtn.addEventListener('click', function() {
    // Reset form and show it again
    cardForm.reset();
    
    // Reset displays
    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardNameDisplay.textContent = 'Jane Appleseed';
    cardExpiryDisplay.textContent = '00/00';
    cardCvcDisplay.textContent = '000';
    
    // Switch views
    completedState.classList.remove('active');
    cardForm.classList.add('active');
  });
}); 