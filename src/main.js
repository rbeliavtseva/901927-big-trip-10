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
import {Statistics} from './components/statistics.js';

const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfoSection = siteHeaderElement.querySelector(`.trip-info`);
const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const pageContainerElement = siteMainElement.querySelector(`.page-body__container`);

const renderTripInfo = () => {
  render(tripInfoSection, new TripInfo(tripInfoData), RenderPosition.AFTERBEGIN);
};

const onTripTabClick = (evt, tripController, statistics) => {
  if (evt.target.classList.length > 1) {
    return;
  } else {
    document.querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
    evt.target.classList.add(`trip-tabs__btn--active`);

    if (evt.target.innerText === `Table`) {
      statistics.hide();
      tripController.show();
    } else {
      tripController.hide();
      statistics.show();
    }
  }
};

const menuItems = generateMenuItems();
const renderMenu = (tripController, statistics) => {
  const siteMenu = new SiteMenu(menuItems);
  render(tripControlsElement, siteMenu, RenderPosition.AFTERBEGIN);

  const tripTabs = siteMenu.getElement().querySelectorAll(`.trip-tabs__btn`);

  tripTabs.forEach((element) => {
    element.addEventListener(`click`, (evt) => onTripTabClick(evt, tripController, statistics));
  });
};

const renderTripContentList = () => {
  render(tripEventsElement, new TripContent(), RenderPosition.BEFOREEND);
  const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
  return eventsListElement;
};

const renderStatistics = (statistics) => {
  render(pageContainerElement, statistics, RenderPosition.BEFOREEND);
};

const events = generateEvents(NUMBER_OF_EVENTS);

const points = new Points(events);
const statistics = new Statistics(points);
const tripController = new TripController(renderTripContentList(), points);
const filterController = new FilterController(tripControlsElement, points, () => tripController.onActiveFilterChange());
renderTripInfo();
renderMenu(tripController, statistics);
filterController.render();
tripController.render(DAYS_COUNT);
renderStatistics(statistics);
