import * as consts from '../consts.js';

const EventTypes = [
  `bus`,
  `drive`,
  `flight`,
  `ship`,
  `taxi`,
  `train`,
  `transport`,
  `check-in`,
  `restaurant`,
  `sightseeing`,
  `trip`
];

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
    type: `luggage`,
    name: `Add luggage`,
    price: `30`
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: `100`,
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: `15`,
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: `5`,
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: `40`
  }
];

const startDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH - 1, consts.Dates.START_DATE);

const endDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH - 1, consts.Dates.END_DATE);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const eventStartDate = new Date(consts.CURRENT_YEAR, consts.CURRENT_MONTH - 1, getRandomIntegerNumber(consts.Dates.START_DATE, consts.Dates.END_DATE));
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

const generateOffers = (offers) => {
  const generatedOptions = [];

  for (let i = 0; i < getRandomIntegerNumber(consts.NumberOfOptions.MIN, consts.NumberOfOptions.MAX); i++) {
    generatedOptions.push(getRandomArrayItem(offers));
  }

  return generatedOptions;
};

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

const generatePictures = (number) => {
  return new Array(number).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generatePrice = () => {
  return getRandomIntegerNumber(consts.AmountOfPrice.MIN, consts.AmountOfPrice.MAX);
};

const generateEvents = (number) => {
  return new Array(number)
    .fill(``)
    .map(generateEvent);
};

const generateEvent = () => {
  return {
    eventType: getRandomArrayItem(EventTypes),
    city: getRandomArrayItem(Cities),
    date: getRandomDate(),
    offers: generateOffers(Offers),
    pictures: generatePictures(consts.NUMBER_OF_PICTURES),
    description: generateDescriptionText(),
    price: generatePrice()
  };
};

const tripInfoData = {
  date: {startDate, endDate},
  cities: Cities
};

export {generateEvent, generateEvents, tripInfoData};
