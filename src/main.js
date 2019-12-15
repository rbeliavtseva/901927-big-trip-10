import TripInfo from './components/trip-info.js';
import SiteMenu from './components/menu.js';
import Filters from './components/filter.js';
import SortTrip from './components/sort.js';
import TripContent from './components/trip-content.js';
import Event from './components/event.js';
import TripCardDay from './components/card/card.js';
import CardEvent from './components/card/card-event.js';
import CardEventContent from './components/card/card-event-content.js';
import {generateEvents, tripInfoData} from './mock/event.js';
import {generateFilters} from './mock/filter.js';
import {generateMenuItems} from './mock/menu.js';
import {RenderPosition, render} from './utils/render.js';

const DAYS_COUNT = 4;
const NUMBER_OF_EVENTS = 4;

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
};

const events = generateEvents(NUMBER_OF_EVENTS);
const renderCards = (numberOfCards) => {
  new Array(numberOfCards)
  .fill(``)
  .forEach((_, i) => {
    const newDay = new TripCardDay(i);
    const tripEventsList = newDay.getElement().querySelector(`.trip-events__list`);
    const filteredEvents = events.filter((it) => it.date.day === i);
    if (filteredEvents.length > 0) {
      filteredEvents.forEach((event)=>{
        const tripCard = new CardEvent();
        const tripEvent = tripCard.getElement();
        const cardEventContent = new CardEventContent(event);
        const cardEventContentEdit = new Event(event);
        const rollupEventBtn = cardEventContent.getElement().querySelector(`.event__rollup-btn`);
        rollupEventBtn.addEventListener(`click`, () => {
          tripEvent.replaceChild(cardEventContentEdit.getElement(), cardEventContent.getElement());
        });
        const editEventForm = cardEventContentEdit.getElement();
        editEventForm.addEventListener(`submit`, () => {
          tripEvent.replaceChild(cardEventContent.getElement(), cardEventContentEdit.getElement());
        });
        render(tripEvent, cardEventContent, RenderPosition.BEFOREEND);
        render(tripEventsList, tripCard, RenderPosition.BEFOREEND);
      });
    }
    render(eventsListElement, newDay, RenderPosition.BEFOREEND);
  });
};

renderTripInfo();
renderMenu();
renderFilter();
renderSorting();
renderTripContentList();
const eventsListElement = tripEventsElement.querySelector(`.trip-days`);
renderCards(DAYS_COUNT);
