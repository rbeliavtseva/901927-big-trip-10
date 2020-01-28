import * as consts from '../consts.js';
import {toCardTimePassedFormat} from '../utils/date-time-format.js';

const EventTypes = {
  Transport: [
    `bus`,
    `drive`,
    `flight`,
    `ship`,
    `taxi`,
    `train`,
    `transport`
  ],
  Activity: [
    `restaurant`,
    `sightseeing`,
    `check-in`
  ]
};

const Cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`
];

const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis
sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue
convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus
sit amet tempus.`;

const Offers = [
  {
    eventType: [`bus`, `flight`, `ship`, `train`],
    type: `luggage`,
    name: `Add luggage`,
    price: `30`
  },
  {
    eventType: [`bus`, `flight`, `ship`, `train`, `transport`],
    type: `comfort`,
    name: `Switch to comfort class`,
    price: `100`,
  },
  {
    eventType: [`flight`, `ship`, `train`],
    type: `meal`,
    name: `Add meal`,
    price: `15`,
  },
  {
    eventType: [`bus`, `flight`, `ship`, `train`, `transport`],
    type: `seats`,
    name: `Choose seats`,
    price: `5`,
  },
  {
    eventType: [`train`, `transport`],
    type: `train`,
    name: `Travel by train`,
    price: `40`
  },
  {
    eventType: [`taxi`, `transport`, `sightseeing`],
    type: `taxi`,
    name: `Order Uber`,
    price: `20`
  },
  {
    eventType: [`drive`, `transport`, `sightseeing`],
    type: `car`,
    name: `Rent a car`,
    price: `200`
  },
  {
    eventType: [`restaurant`, `check-in`, `train`],
    type: `breakfast`,
    name: `Add breakfast`,
    price: `30`
  },
  {
    eventType: [`sightseeing`],
    type: `ticket`,
    name: `Buy express ticket`,
    price: `50`
  },
  {
    eventType: [`check-in`],
    type: `minibar`,
    name: `Add minibar`,
    price: `150`
  },
  {
    eventType: [`sightseeing`],
    type: `guide`,
    name: `Book a personal guide`,
    price: `100`
  }
];

const startDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH, consts.Dates.START_DATE);

const endDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH, consts.Dates.END_DATE);

const tripInfoData = {
  date: {startDate, endDate},
  cities: Cities
};

/**
 * Функция возвращает случайный элемент массива
 * @param {array} array Массив
 * @return {*} Элемент массива
 */
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

/**
 * Функция возвращает случайное число в диапазоне двух чисел
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Случайное число в диапазоне
 */
const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Функция возвращает случайную дату в указанном диапазоне
 * @return {*} Возвращает случайную дату начала события, количество прошедших дней, случайную дату конца события
 */
const getRandomDate = () => {
  const eventStartDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH, getRandomIntegerNumber(consts.Dates.START_DATE, consts.Dates.END_DATE));
  const diffTime = Math.abs(eventStartDate - startDate);
  const day = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  eventStartDate.setHours(getRandomIntegerNumber(consts.Hours.MIN, consts.Hours.MAX));
  eventStartDate.setMinutes(getRandomIntegerNumber(consts.Minutes.MIN, consts.Minutes.MAX));

  const eventEndDate = new Date(eventStartDate.getFullYear(),
      eventStartDate.getMonth(),
      eventStartDate.getDate(),
      getRandomIntegerNumber(eventStartDate.getHours(), consts.Hours.MAX),
      getRandomIntegerNumber(eventStartDate.getMinutes(), consts.Minutes.MAX));

  return {eventStartDate, day, eventEndDate};
};

/**
 * Функция генерирует массив из случайных офферов
 * @param {string} eventType Тип поездки
 * @return {array} Возвращает массив из объектов
 */
const generateOffers = (eventType) => {
  const generatedOffers = Offers.filter((offer) => offer.eventType.includes(eventType));

  return generatedOffers;
};

/**
 * Функция генерирует массив из случайных предложений
 * @param {string} text Текст
 * @return {array} Возвращает массив из строк
 */
const generateDescription = (text) => {
  const fromTextArray = text.split(`.`);
  const descriptionText = [];

  for (let i = 0; i < getRandomIntegerNumber(consts.NumberOfSentences.MIN, consts.NumberOfSentences.MAX); i++) {
    descriptionText.push(getRandomArrayItem(fromTextArray));
  }

  return descriptionText;
};

const generateDescriptionText = () => {
  return generateDescription(mockText);
};

/**
 * Функция генерирует массив из случайных фотографий
 * @param {number} number Количество фото
 * @return {array} Возвращает массив из строк
 */
const generatePictures = (number) => {
  return new Array(number).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generatePrice = () => {
  return getRandomIntegerNumber(consts.AmountOfPrice.MIN, consts.AmountOfPrice.MAX);
};

const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

/**
 * Функция генерирует случайное событие
 * @param {number} eventNumber Порядковый номер точки маршрута
 * @return {object} Возвращает объект
 */
const generateEvent = (eventNumber) => {
  const randomDate = getRandomDate();
  const randomEventType = getRandomArrayItem(EventTypes.Transport.concat(EventTypes.Activity));

  return {
    eventType: randomEventType,
    city: getRandomArrayItem(Cities),
    date: randomDate,
    offers: generateOffers(randomEventType),
    pictures: generatePictures(consts.NUMBER_OF_PICTURES),
    description: generateDescriptionText(),
    price: generatePrice(),
    duration: toCardTimePassedFormat(randomDate.eventStartDate, randomDate.eventEndDate),
    isFavourite: getRandomBoolean(),
    id: eventNumber
  };
};

const defaultEvent = () => {
  return {
    eventType: EventTypes.Transport[0],
    city: ``,
    date: ``,
    offers: generateOffers(EventTypes.Transport[0]),
    pictures: ``,
    description: ``,
    price: ``,
    duration: ``,
    isFavourite: false,
    id: ``
  };
};

/**
 * Функция генерирует массив из событий заданной длины
 * @param {number} number Количество событий
 * @return {array} Возвращает массив из объектов
 */
const generateEvents = (number) => {
  return new Array(number)
    .fill(``)
    .map((_, i) => generateEvent(i));
};

export {generateEvent, generateEvents, tripInfoData, EventTypes, Cities, generateOffers, defaultEvent, generateDescriptionText, generatePictures, startDate};
