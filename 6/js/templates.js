import {typeClass} from './utility.js';

const template = document.querySelector('#card').content;
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
  if (goods.offer.features.length) {
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
  if (goods.offer.photos.length) {
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

export {renderCards};