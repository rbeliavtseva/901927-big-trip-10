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

const numberOfSentences = {
  MIN: 1,
  MAX: 3
};

const numberOfOptions = {
  MIN: 0,
  MAX: 2
};

const numberOfPictures = 5;

const amountOfPrice = {
  MIN: 20,
  MAX: 199
};

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

const CURRENT_YEAR = 2019;

const CURRENT_MONTH = 3;

const Hours = {
  MIN: 0,
  MAX: 23
};

const Minutes = {
  MIN: 0,
  MAX: 59
};

const dates = {
  START_DATE: 18,
  END_DATE: 21
};

const startDate = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, dates.START_DATE);

const endDate = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, dates.END_DATE);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const eventStartDate = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, getRandomIntegerNumber(dates.START_DATE, dates.END_DATE));
  const diffTime = Math.abs(eventStartDate - startDate);
  const day = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  eventStartDate.setHours(getRandomIntegerNumber(Hours.MIN, Hours.MAX));
  eventStartDate.setMinutes(getRandomIntegerNumber(Minutes.MIN, Minutes.MAX));

  const eventEndDate = new Date(eventStartDate.getFullYear(),
      eventStartDate.getMonth(),
      eventStartDate.getDate(),
      getRandomIntegerNumber(eventStartDate.getHours(), Hours.MAX),
      getRandomIntegerNumber(eventStartDate.getMinutes(), Minutes.MAX));

  return {eventStartDate, day, eventEndDate};
  // const sign = Math.random() > 0.5 ? 1 : -1;
  // const diffValue = sign * getRandomIntegerNumber(0, 7);

  // startDate.setDate(startDate.getDate() + diffValue);

  // let endDate = startDate;
  // endDate.setHours(endDate.getHours() + 1);
  // endDate.setMinutes(endDate.getMinutes() + 30);

  // console.log(startDate, endDate);
  // return {startDate, endDate};
};

const generateOffers = (options) => {
  const generatedOptions = [];

  for (let i = 0; i < getRandomIntegerNumber(numberOfOptions.MIN, numberOfOptions.MAX); i++) {
    generatedOptions.push(getRandomArrayItem(options));
  }

  return generatedOptions;
};

const generateDescription = (text) => {
  const fromTextArray = text.split(`.`);
  const descriptionText = [];

  for (let i = 0; i < getRandomIntegerNumber(numberOfSentences.MIN, numberOfSentences.MAX); i++) {
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
  return getRandomIntegerNumber(amountOfPrice.MIN, amountOfPrice.MAX);
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
    pictures: generatePictures(numberOfPictures),
    description: generateDescriptionText(),
    price: generatePrice()
  };
};

const tripInfoData = {
  date: {startDate, endDate},
  cities: Cities
};

export {generateEvent, generateEvents, tripInfoData};
