import {typeClass, isEscapeKey, closeUserModal} from './utility.js';

const template = document.querySelector('#card').content;
const templSuccessMessage = document.querySelector('#success').content;
const templErrorMessage = document.querySelector('#error').content;
const cardTemplate = template.querySelector('.popup');


const renderCards = (goods) => {
  const card = cardTemplate.cloneNode(true);
  const photo = card.querySelector('.popup__photos');
  const popup = card.querySelector('.popup__features');
  photo.innerHTML = '';
  popup.innerHTML = '';
  card.querySelector('.popup__avatar').src = goods.author.avatar;
  card.querySelector('.popup__title').textContent = goods.offer.title;
  card.querySelector('.popup__text--address').textContent = goods.offer.address;
  card.querySelector('.popup__text--price').textContent = goods.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = typeClass[goods.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${goods.offer.rooms} комнаты для ${goods.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${goods.offer.checkin}, выезд до ${goods.offer.checkout}`;
  if (goods.offer.features) {
    goods.offer.features.forEach((item) => {
        const createElem = document.createElement('li');
        createElem.classList.add('popup__feature');
        createElem.classList.add(`popup__feature--${item}`);
        popup.appendChild(createElem);
      }
    );
  } else {
    card.removeChild(popup);
  }
  card.querySelector('.popup__description').textContent = goods.offer.description;
  if (goods.offer.photos) {
    goods.offer.photos.forEach((item) => {
      const createElem = document.createElement('img');
      createElem.classList.add('popup__photo');
      createElem.src = item;
      createElem.width = 45;
      createElem.height = 40;
      createElem.alt = 'Фотография жилья';
      photo.appendChild(createElem);
    });
  } else {
    card.removeChild(photo);
  }
  return card;
};

const renderSuccessMessage = () => {
  const ALERT_SHOW_TIME = 5000;
  const successCard = templSuccessMessage.cloneNode(true);
  const succContainer = successCard.querySelector('.success');
  document.body.appendChild(successCard);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeUserModal(succContainer);
    }
  });
  setTimeout(() => {
    succContainer.remove();
  }, ALERT_SHOW_TIME);
  document.addEventListener('click', function () {
    succContainer.remove();
  });
};

const renderErrorMessage = () => {
  const ALERT_SHOW_TIME = 5000;
  const errorCard = templErrorMessage.cloneNode(true);
  const errContainer = errorCard.querySelector('.error');
  const closeButton = errorCard.querySelector('.error__button');
  document.body.appendChild(errorCard);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeUserModal(errContainer);
    }
  });
  setTimeout(() => {
    errContainer.remove();
  }, ALERT_SHOW_TIME);
  closeButton.addEventListener('click', function () {
    errContainer.remove();
  });
  document.addEventListener('click', function () {
    errContainer.remove();
  });
};

export {renderCards, renderSuccessMessage, renderErrorMessage};
