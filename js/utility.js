/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.
Пример использования функции: имя_функции(от, до); // Результат: целое число из диапазона "от...до"
Учтите, что диапазон может быть только положительный, включая ноль.
А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
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
 */
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};


// функция для добавления "0" если число от 1 до 10.
const addZero = (num) => num > 9 ? num.toString() : '0' + num.toString();


// вспомогательная функция для перебора значений массива.
const getRandomArrayKey = (arr) => {
  const length = arr.length - 1;
  return arr[getRandomPositiveInteger(0, length)];
};

// функция для перевода с Англ. на Руск. тип жилья
let typePlaceChoose = (type, obj) => {
  switch (type) {
    case 'palace':
      obj.textContent = 'Дворец';
      break;
    case 'flat':
      obj.textContent = 'Квартира';
      break;
    case 'house':
      obj.textContent = 'Дом';
      break;
    case 'bungalow':
      obj.textContent = 'Бунгало';
      break;
    case 'hotel':
      obj.textContent = 'Отель';
      break;
    default:
      obj.textContent;
      break;
  }
  return obj.textContent;
};

export {getRandomPositiveFloat, addZero, getRandomPositiveInteger, getRandomArrayKey, typePlaceChoose};
