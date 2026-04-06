document.addEventListener('DOMContentLoaded', () => {

  const modalOverlay = document.getElementById('payment-modal');
  const closeBtn = document.getElementById('close-modal');
  const closeSuccessBtn = document.getElementById('close-success');
  const buyButtons = document.querySelectorAll('.buy-button'); // Upewnij się, że Twoje 3 przyciski mają tę klasę!
  
  const form = document.getElementById('payment-form');
  const formContainer = document.getElementById('payment-form-container');
  const successMessage = document.getElementById('success-message');
  
  const submitBtn = document.getElementById('submit-payment');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  
  const cardInput = document.getElementById('card');
  const cardError = document.getElementById('card-error');

  const openModal = () => {
    modalOverlay.classList.remove('hidden');
    formContainer.classList.remove('hidden');
    successMessage.classList.add('hidden');
    form.reset();
    cardError.classList.add('hidden');
  };


  const closeModal = () => {
    modalOverlay.classList.add('hidden');
  };


  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); 
      openModal();
    });
  });


  closeBtn.addEventListener('click', closeModal);
  closeSuccessBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  cardInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();

   
    const cardNumber = cardInput.value.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
      cardError.classList.remove('hidden');
      return; 
    }
    cardError.classList.add('hidden');

    // SYMULACJA PŁATNOŚCI
    submitBtn.disabled = true;
    btnText.textContent = 'Przetwarzanie...';
    btnSpinner.classList.remove('hidden');


    setTimeout(() => {

      formContainer.classList.add('hidden');
      successMessage.classList.remove('hidden');
      
      submitBtn.disabled = false;
      btnText.textContent = 'Zapłać 299 zł';
      btnSpinner.classList.add('hidden');
    }, 2000); 
  });
});