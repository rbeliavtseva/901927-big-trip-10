import {TripInfo} from './components/trip-info.js';
import {SiteMenu} from './components/menu.js';
import {Filters} from './components/filter.js';
import {SortTrip} from './components/sort.js';
import {TripContent} from './components/trip-content.js';
import {generateEvents, tripInfoData} from './mock/event.js';
import {generateFilters} from './mock/filter.js';
import {generateMenuItems} from './mock/menu.js';
import {render} from './utils/render.js';
import {RenderPosition, DAYS_COUNT, NUMBER_OF_EVENTS} from './consts.js';
import {TripController} from './controllers/trip-controller.js';

const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoSection = siteHeaderElement.querySelector(`.trip-info`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const renderTripInfo = () => {
  render(tripInfoSection, new TripInfo(tripInfoData), RenderPosition.AFTERBEGIN);
};

const menuItems = generateMenuItems();
const renderMenu = () => {
  render(tripControlsElement.children[0], new SiteMenu(menuItems), RenderPosition.AFTERBEGIN);
};

const filters = generateFilters();
const renderFilter = () => {
  render(tripControlsElement, new Filters(filters), RenderPosition.BEFOREEND);
};

const renderSorting = () => {
  render(tripEventsElement, new SortTrip(), RenderPosition.BEFOREEND);
};

const renderTripContentList = () => {
  render(tripEventsElement, new TripContent(), RenderPosition.BEFOREEND);
  const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
  return eventsListElement;
};

const events = generateEvents(NUMBER_OF_EVENTS);

renderTripInfo();
renderMenu();
renderFilter();
renderSorting();
const tripController = new TripController((renderTripContentList()));
tripController.render(events, DAYS_COUNT);
