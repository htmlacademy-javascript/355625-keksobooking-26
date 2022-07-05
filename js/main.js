/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.
Пример использования функции: имя_функции(от, до); // Результат: целое число из диапазона "от...до"
Учтите, что диапазон может быть только положительный, включая ноль.
А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.

Мой вариант:
const getRandomIntInclusive =(minInt, maxInt)=> {
  if (minInt >= 0 && maxInt >= 0) { // Проверяем на положительные числа.
    return Math.floor(Math.random() * (Math.floor(maxInt) - Math.ceil(minInt) + 1)) + Math.ceil(minInt); //Максимум и минимум включаются.
  }
  return 'Err: NO below ZERO argument is allowed'; // Ругаемся на отрицательное число.
};
*/
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
/*
Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
Будет использоваться для генерации временных географических координат в следующем задании.
Пример использования функции: имя_функции(от, до, количество_знаков_после_запятой); // Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
Учтите, что диапазон может быть только положительный, включая ноль. А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях. Например, 1.1, 1.2 — корректный диапазон.
Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.

Мой вариант:
const getRandomFloatInclusive =(minFloat, maxFloat, roundNum)=> {
  if (minFloat >= 0 && maxFloat >= 0) { // Проверяем на положительные числа.
    const floatRes = Math.random() * (maxFloat - minFloat + 1) + minFloat; //Максимум и минимум включаются и заносится в переменную.
    return +floatRes.toFixed(roundNum);
  }
  return 'Err: NO below ZERO argument is allowed !'; // Ругаемся на отрицательное число.
};
 */
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};
/* функция для добавления "0" если число от 1 до 10.
Мой вариант:
const zeroAdd = (num) => {
  const places = 2;
  if (num > 0 && num < 10) {
    const numZeroes = places - num.toString().length + 1;
    return Array(+numZeroes).join("0") + num;
  }
  return num;
};
 */
const addZero = (num) => num > 9 ? num.toString() : '0' + num.toString();
// вспомогательная функция для преобразования в массив для удобства работы.
const convertToArray = (...arguments) => {
  return Object.assign([], arguments);
};
// вспомогательная функция для перебора значений массива.
const getRandomArrayKey = (arr) => {
  const length = arr.length - 1;
  return arr[getRandomPositiveInteger(0, length)];
};
// задаем объекты через функции для удобства использывания при итерации через метод map
const createLocation = () => {
  return {
    'lat': getRandomPositiveFloat(35.65000, 35.70000, 2),
    'lng': getRandomPositiveFloat(139.70000, 139.80000, 2),
  }
};
const createAuthor = () => {
  return {
    'avatar': `img/avatars/user${addZero(getRandomPositiveInteger(1, 10))}.png`
  }
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
    'features': getRandomArrayKey(features),
    'description': `Дом премиум-класса "Поклонная 9" расположен в исторически значимом и одном из самых престижных районов столицы  Дорогомилово, перпендикулярно Кутузовскому проспекту. Слева от дома "Поклонная 9" находится мемориальный комплекс Парк Победы и знаменитая Триумфальная арка. Добраться до Кремлевской набережной от жилого комплекса можно всего за 10-15 минут, а выезд на ТТК расположен в 900 м.`,
    'photos': getRandomArrayKey(photos)
  }
};

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

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

createOffersArray(10);

