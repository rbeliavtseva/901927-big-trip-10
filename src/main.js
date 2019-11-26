import {createTripTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTripTemplate} from './components/sort.js';
import {createTripContentTemplate} from './components/trip-content.js';
import {createEventTemplate} from './components/event.js';
import {createTripCardTemplate} from './components/card.js';

const DAYS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoSection = siteHeaderElement.querySelector(`.trip-info`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTripInfo = () => {
  render(tripInfoSection, createTripTemplate(), `afterbegin`);
};

const renderMenu = () => {
  render(tripControlsElement.children[0], createMenuTemplate(), `afterend`);
};

const renderFilter = () => {
  render(tripControlsElement, createFilterTemplate());
};

const renderSorting = () => {
  render(tripEventsElement, createSortTripTemplate());
};

const renderTripContentList = () => {
  render(tripEventsElement, createTripContentTemplate());
};

const renderTripForm = () => {
  render(eventsListElement, createEventTemplate());
};

const renderCards = (numberOfCards) => {
  new Array(numberOfCards)
  .fill(``)
  .forEach(() => render(eventsListElement, createTripCardTemplate())
  );
};

renderTripInfo();
renderMenu();
renderFilter();
renderSorting();
renderTripContentList();
const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
renderTripForm();
renderCards(DAYS_COUNT);
