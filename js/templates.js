import {typePlaceChoose} from './utility.js';

let template = document.querySelector('#card').content;
let cardTemplate = template.querySelector('.popup');
let cardTitle = template.querySelector('.popup__title');
let cardAddress = template.querySelector('.popup__text--address');
let cardPrice = template.querySelector('.popup__text--price');
let cardType = template.querySelector('.popup__type');
let cardGuest = template.querySelector('.popup__text--capacity');
let cardChekin = template.querySelector('.popup__text--time');
let cardFeatures = template.querySelector('.popup__features');
let cardFeaturesChildren = cardFeatures.querySelectorAll('.popup__feature');
let cardDescription = template.querySelector('.popup__description');
let cardPhoto = template.querySelector('.popup__photos');
let cardPhotoChildren = template.querySelector('.popup__photo');
let cardAvatar = template.querySelector('.popup__avatar');

let assembleAllDataForTemplate = (arr, temp, col) => {

  arr.forEach((item) => {
    cardTitle.textContent = item.offer.title;
    cardAddress.textContent = item.offer.address;
    cardPrice.textContent = item.offer.price + ' ₽/ночь';
    cardType.textContent = typePlaceChoose(item.offer.type, cardType);
    cardGuest.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
    cardChekin.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
    // Ниже в коде есть смонения, может сильно заморочился
    if (col) { // проверяем на наличие
      for (let elem of col) {  // пробегаемся сначало по коллекции из детишек popup__features
        let classValue = elem.classList.item(1).substr(16); // вычленяем string в классе детишек для сравнения с вводными данными (объектом)
        if (item.offer.features === classValue) { // сравниваем если вырезанный текст из класса идентичен тексту из вводного объекта
          elem.textContent = item.offer.features; // передаем в контент или можно переделать на удаления ненужных классов в шаблоне
        }
      }
    }
    cardDescription.textContent = item.offer.description;
    cardPhotoChildren.src = item.offer.photos;
    cardAvatar.src = item.author.avatar;
  });

  return temp;
};

export {assembleAllDataForTemplate, cardTemplate, cardFeaturesChildren};
