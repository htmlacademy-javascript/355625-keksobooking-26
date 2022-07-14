import {getRandomPositiveFloat, addZero, getRandomPositiveInteger, getRandomArrayKey} from './utility.js';

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createLocation = () => {
  return {
    'lat': getRandomPositiveFloat(35.65000, 35.70000, 2),
    'lng': getRandomPositiveFloat(139.70000, 139.80000, 2),
  };
};

const createAuthor = () => {
  return {
    'avatar': `img/avatars/user${addZero(getRandomPositiveInteger(1, 10))}.png`
  };
};

const createOffer = () => {
  return {
    'title': 'Объявление по недвижимости.',
    'address': Object.values(createLocation()).join(', '),
    'price': getRandomPositiveInteger(1000, 1000000),
    'type': getRandomArrayKey(type),
    'rooms': getRandomPositiveInteger(1, 100),
    'guests': getRandomPositiveInteger(1, 500),
    'checkin': getRandomArrayKey(checkin),
    'checkout': getRandomArrayKey(checkout),
    'features': features,
    'description': `Дом премиум-класса "Поклонная 9" расположен в исторически значимом и одном из самых престижных районов столицы  Дорогомилово, перпендикулярно Кутузовскому проспекту. Слева от дома "Поклонная 9" находится мемориальный комплекс Парк Победы и знаменитая Триумфальная арка. Добраться до Кремлевской набережной от жилого комплекса можно всего за 10-15 минут, а выезд на ТТК расположен в 900 м.`,
    'photos': photos
  };
};

// собираем наши объекты
const formMapping = () => {
  return {offer: createOffer(), author: createAuthor(), location: createLocation()};
};

// формируем массив объектов
const createOffersArray = (num) => {
  return [...Array(num)].map(() => {
    return formMapping();
  });
};

export {createOffersArray};
