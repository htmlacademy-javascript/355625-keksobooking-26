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
const getRandomPositiveInteger =(a, b)=> {
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
const getRandomPositiveFloat =(a, b, digits = 1)=> {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// функция для добавления "0" если число от 1 до 10.
const zeroAdd = (num) => {
  const places = 2;
  if (num > 0 && num < 10) {
    const numZeroes = places - num.toString().length + 1;
    return Array(+numZeroes).join("0") + num;
  }
  return num;
};

/*
В файле main.js на основе написанных в прошлом задании вспомогательных функций напишите необходимые функции для создания массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.
Структура каждого объекта должна быть следующей:

author, объект — описывает автора. Содержит одно поле:
avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

offer, объект — содержит информацию об объявлении. Состоит из полей:
title, строка — заголовок предложения. Придумайте самостоятельно.
address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
price, число — стоимость. Случайное целое положительное число.
type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
rooms, число — количество комнат. Случайное целое положительное число.
guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
description, строка — описание помещения. Придумайте самостоятельно.
photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

location, объект — местоположение в виде географических координат. Состоит из двух полей:
lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
 */
const author = {
  'avatar': `img/avatars/user${zeroAdd(getRandomPositiveInteger(1,10))}.png`
};
const offer = {
  'title': 'Объявление по недвижимости.',
  'address': '',
  'price': getRandomPositiveInteger(1000,1000000),
  'type': ['palace','flat','house','bungalow','hotel'],
  'rooms': getRandomPositiveInteger(1,100),
  'guests': getRandomPositiveInteger(1,500),
  'checkin': ['12:00','13:00','14:00'],
  'checkout': ['12:00','13:00','14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': `Дом премиум-класса "Поклонная 9" расположен в исторически значимом и одном из самых престижных районов столицы  Дорогомилово, перпендикулярно Кутузовскому проспекту. Слева от дома "Поклонная 9" находится мемориальный комплекс Парк Победы и знаменитая Триумфальная арка. Добраться до Кремлевской набережной от жилого комплекса можно всего за 10-15 минут, а выезд на ТТК расположен в 900 м.`,
  'photos': ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']
};
const location = {
  'lat': getRandomPositiveFloat(35.65000, 35.70000, 2),
  'lng': getRandomPositiveFloat(139.70000, 139.80000, 2),
};
