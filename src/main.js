import {createTripTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTripTemplate} from './components/sort.js';
import {createTripContentTemplate} from './components/trip-content.js';
import {createEventTemplate} from './components/event.js';
import {createTripCardTemplate} from './components/card.js';
import {generateEvents, tripInfoData} from './mock/event.js';
import {generateFilters} from './mock/filter.js';
import {generateMenuItems} from './mock/menu.js';

const DAYS_COUNT = 4;
const NUMBER_OF_EVENTS = 4;

const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoSection = siteHeaderElement.querySelector(`.trip-info`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTripInfo = () => {
  render(tripInfoSection, createTripTemplate(tripInfoData), `afterbegin`);
};

const menuItems = generateMenuItems();
const renderMenu = () => {
  render(tripControlsElement.children[0], createMenuTemplate(menuItems), `afterend`);
};

const filters = generateFilters();
const renderFilter = () => {
  render(tripControlsElement, createFilterTemplate(filters));
};

const renderSorting = () => {
  render(tripEventsElement, createSortTripTemplate());
};

const renderTripContentList = () => {
  render(tripEventsElement, createTripContentTemplate());
};

const generatedEvent = generateEvents(NUMBER_OF_EVENTS);
const renderTripForm = () => {
  render(eventsListElement, createEventTemplate(generatedEvent[0]));
};

const cards = generatedEvent.slice(1, generatedEvent.length);
const renderCards = (numberOfCards) => {
  new Array(numberOfCards)
  .fill(``)
  .forEach((_, i) => {
    const filteredElements = cards.filter((it) => it.date.day === i);
    if (filteredElements.length > 0) {
      render(eventsListElement, createTripCardTemplate(filteredElements, i));
    }
  });
};

renderTripInfo();
renderMenu();
renderFilter();
renderSorting();
renderTripContentList();
const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
renderTripForm();
renderCards(DAYS_COUNT);
