import {TripInfo} from './components/trip-info.js';
import {SiteMenu} from './components/menu.js';
import {TripContent} from './components/trip-content.js';
import {generateEvents, tripInfoData} from './mock/event.js';
import {generateMenuItems} from './mock/menu.js';
import {render} from './utils/render.js';
import {RenderPosition, DAYS_COUNT, NUMBER_OF_EVENTS} from './consts.js';
import {TripController} from './controllers/trip-controller.js';
import {Points} from './models/points.js';
import {FilterController} from './controllers/filter-controller.js';

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

const renderTripContentList = () => {
  render(tripEventsElement, new TripContent(), RenderPosition.BEFOREEND);
  const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
  return eventsListElement;
};

const events = generateEvents(NUMBER_OF_EVENTS);

renderTripInfo();
renderMenu();
const points = new Points(events);
const tripController = new TripController(renderTripContentList(), points);
const filterController = new FilterController(tripControlsElement, points, () => tripController.onActiveFilterChange());
filterController.render();
tripController.render(DAYS_COUNT);
