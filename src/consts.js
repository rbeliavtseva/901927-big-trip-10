const CURRENT_YEAR = new Date(Date.now()).getFullYear();

const CURRENT_MONTH = new Date(Date.now()).getMonth();

const Hours = {
  MIN: 0,
  MAX: 23
};

const Minutes = {
  MIN: 0,
  MAX: 59
};

const Dates = {
  START_DATE: new Date(Date.now()).getDate() - 1,
  END_DATE: new Date(Date.now()).getDate() + 2
};

const NumberOfSentences = {
  MIN: 1,
  MAX: 3
};

const NumberOfOptions = {
  MIN: 0,
  MAX: 2
};

const NUMBER_OF_PICTURES = 5;

const AmountOfPrice = {
  MIN: 20,
  MAX: 199
};

const MS = 1000;

const TIME = 60;

const DAYS_COUNT = 4;
const NUMBER_OF_EVENTS = 4;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const Keycodes = {
  ESC_KEYCODE: 27
};

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

const actionType = {
  CREATE: `Cancel`,
  EDIT: `Delete`
};

const FilterNames = {
  Everything: `everything`,
  Future: `future`,
  Past: `past`
};

const MsToDays = 1000 * 60 * 60 * 24;

export {
  CURRENT_YEAR,
  CURRENT_MONTH,
  Hours,
  Minutes,
  Dates,
  NumberOfSentences,
  NumberOfOptions,
  NUMBER_OF_PICTURES,
  AmountOfPrice,
  MS,
  TIME,
  DAYS_COUNT,
  NUMBER_OF_EVENTS,
  RenderPosition,
  Keycodes,
  SortType,
  actionType,
  FilterNames,
  MsToDays
};
