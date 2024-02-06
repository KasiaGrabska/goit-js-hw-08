//importujemy bibliotekę lodash.throttle
import throttle from 'lodash.throttle';

//za pomocą tych zmiennych doastajemy się do formularza i jegi dzieci
const form = document.querySelector('form');
const emailInput = document.querySelector('input');
const messageTextArea = document.querySelector('textarea');

// zmienna zawiera funkcję która ma się wywoływać co pół sekundy
// ta funkcja to zapisywanie danych do localStorage
const saveToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value.trim(),
    message: messageTextArea.value.trim(),
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const loadFromLocalStorage = () => {
  // ta zmienna to wartość klucza feedback
  const formDataJSON = localStorage.getItem('feedback-form-state');
  // ten if sprawdza czy owa wartość istnieje
  if (formDataJSON) {
    // jeśli tak to tworzy zmienną która prasuje
    const formData = JSON.parse(formDataJSON);
    emailInput.value = formData.email;
    messageTextArea.value = formData.message;
  }
};

loadFromLocalStorage();

form.addEventListener('input', saveToLocalStorage);

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const email = emailInput.value.trim();
  const message = messageTextArea.value.trim();

  if (email === '' || message === '') {
    // Sprawdzenie czy pola są puste
    alert('All fields must be completed!');
    return;
  }
  form.reset();
  localStorage.removeItem('feedback-form-state');
  console.log('Submitted:', { email, message });
});
