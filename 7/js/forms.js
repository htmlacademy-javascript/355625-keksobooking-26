const switchForm = (classAdd, toggleName, index) => {
  const allForms = document.forms;
  if (classAdd) {
    for (let elem of allForms) {
      elem.classList.add(classAdd);
    }
  }
  if (toggleName && index <= allForms.length) {
    for (let elem of allForms[index].elements) {
      elem.setAttribute(toggleName, '');
    }
  }
  return allForms;
};

// Валидация формы

const sendForm = document.querySelector('.ad-form');
const pristine = new Pristine(sendForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

const roomsField = sendForm.querySelector('[name="rooms"]');
const capacityField = sendForm.querySelector('[name="capacity"]');
const guestsOption = {
  1: 'это только для 1 комнаты',
  2: 'это только для 2 комнат',
  3: 'это только для 3 комнат',
  100: 'не для гостей',
};


const validateNicknameTitle = (value) => {
  return value.length >= 30 && value.length <= 100;
};
const validateNicknamePrice = (value) => {
  return parseInt(value) <= 100000 && parseInt(value) > 0;
};

const validateGuestOption = () => {
  return roomsField.value >= capacityField.value;
};

function getDeliveryErrorMessage() {
  return `${guestsOption[capacityField.value]}`;
}

pristine.addValidator(sendForm.querySelector('#title'), validateNicknameTitle, 'должно быть от 30 до 100 символов');
pristine.addValidator(sendForm.querySelector('#price'), validateNicknamePrice, 'должно быть от 1 до 100 000 рублей');
pristine.addValidator(capacityField, validateGuestOption, getDeliveryErrorMessage);

const validateForm = () => {
  sendForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};


export {switchForm, validateForm};
