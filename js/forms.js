import {renderErrorMessage, renderSuccessMessage} from './templates.js';
import {sendData} from './api.js';

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
const timeScheduleInCheck = sendForm.querySelector('#timein');
const timeScheduleOutCheck = sendForm.querySelector('#timeout');
const housingPrice = sendForm.querySelector('[name="price"]');
const housingType = sendForm.querySelectorAll('#type');
const sliderElement = document.querySelector('.ad-form__slider');
const guestsOption = {
  1: 'это только для 1 комнаты',
  2: 'это только для 2 комнат',
  3: 'это только для 3 комнат',
  100: 'не для гостей',
};
const priceOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

timeScheduleInCheck.addEventListener('change', () => {
  timeScheduleOutCheck.value = timeScheduleInCheck.value;
});
timeScheduleOutCheck.addEventListener('change', () => {
  timeScheduleInCheck.value = timeScheduleOutCheck.value;
});
sendForm.querySelector('#type').addEventListener('change', () => {
  housingType.forEach((item) => {
    housingPrice.placeholder = priceOption[item.value];
    housingPrice.setAttribute('min', priceOption[item.value]);
  });
});
roomsField.addEventListener('change', () => {
  sendForm.querySelectorAll('[name="rooms"]').forEach((item) => {
    console.log(item.value);
    capacityField[0] = guestsOption[100];
  });
});


const validateNicknameTitle = (value) => {
  return value.length >= 30 && value.length <= 100;
};
const validateNicknamePrice = (value) => {
  return parseInt(value) <= 100000 && parseInt(value) > 0;
};
const validateGuestOption = () => {
  return roomsField.value >= capacityField.value;
};
const validatePriceMinValue = () => {
  return housingPrice.value >= housingPrice.min;
};
const getDeliveryErrorMessage = () => {
  return `${guestsOption[capacityField.value]}`;
};


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  housingPrice.value = sliderElement.noUiSlider.get();
});

housingPrice.addEventListener('change', () => {
    sliderElement.noUiSlider.set(housingPrice.value);
});




pristine.addValidator(sendForm.querySelector('#title'), validateNicknameTitle, 'должно быть от 30 до 100 символов');
pristine.addValidator(sendForm.querySelector('#price'), validateNicknamePrice, 'должно быть от 1 до 100 000 рублей');
pristine.addValidator(capacityField, validateGuestOption, getDeliveryErrorMessage);
pristine.addValidator(housingPrice, validatePriceMinValue, 'Сумма должна быть не меньше минимальной ценой за ночь');


const setValidateAndFormSubmit = (onSuccess) => {
  sendForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        ()=>renderSuccessMessage(),
        ()=>renderErrorMessage(),
         new FormData(evt.target),
      );
    }
  });
};


export {switchForm, setValidateAndFormSubmit, sendForm};
