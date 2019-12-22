import {TripInfo} from './components/trip-info.js';
import {SiteMenu} from './components/menu.js';
import {Filters} from './components/filter.js';
import {SortTrip} from './components/sort.js';
import {TripContent} from './components/trip-content.js';
import {Event} from './components/event.js';
import {TripCardDay} from './components/card.js';
import {CardEvent} from './components/card-event.js';
import {CardEventContent} from './components/card-event-content.js';
import {FirstEventMessage} from './components/first-event-message';
import {generateEvents, tripInfoData} from './mock/event.js';
import {generateFilters} from './mock/filter.js';
import {generateMenuItems} from './mock/menu.js';
import {render} from './utils/render.js';
import {RenderPosition, DAYS_COUNT, NUMBER_OF_EVENTS, Keycodes} from './consts.js';

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

const renderFirstEventMessage = () => {
  render(tripEventsElement, new FirstEventMessage(), RenderPosition.BEFOREEND);
};

/**
 * Функция рендерит все карточки-контейнеры для каждого дня путешествия
 * @param {number} numberOfCards Количество дней путешествия
 */
const renderCards = (numberOfCards) => {
  new Array(numberOfCards)
  .fill(``)
  .forEach((_, day) => {
    renderDayOfTrip(day);
  });
};

/**
 * Функция заполняет контейнер дня путешествия
 * @param {number} day Номер дня путешествия
 */
const renderDayOfTrip = (day) => {
  const newDay = new TripCardDay(day, tripInfoData.date.startDate);
  const tripEventsList = newDay.getElement().querySelector(`.trip-events__list`);
  const filteredEvents = events.filter((it) => it.date.day === day);
  if (filteredEvents.length > 0) {
    renderDayEvents(filteredEvents, tripEventsList);
  }

  render(renderTripContentList(), newDay, RenderPosition.BEFOREEND);
};

/**
 * Функция заполнения событиями дня
 * @param {array} filteredEvents - массив событий, отфильтрованных по конкретному дню
 * @param {element} tripEventsList - контейнер
 */
const renderDayEvents = (filteredEvents, tripEventsList) => {
  filteredEvents.forEach((event) => {
    const tripDayEvent = new CardEvent();
    const tripEvent = tripDayEvent.getElement();
    renderTripDayEventContent(event, tripEvent);

    render(tripEventsList, tripDayEvent, RenderPosition.BEFOREEND);
  });
};

/**
 * Функция рендерит два типа карточки для каждого ивента - сокращенную и форму редактирования
 * @param {object} singleEvent - одиночное событие из массива событий одного дня
 * @param {element} tripEvent - контейнер
 */
const renderTripDayEventContent = (singleEvent, tripEvent) => {
  const tripDayEventContent = new CardEventContent(singleEvent);
  const tripDayEventContentEdit = new Event(singleEvent);

  const onEscReplaceElements = (evt) => {
    if (evt.keyCode === Keycodes.ESC_KEYCODE) {
      tripEvent.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
      document.removeEventListener(`keydown`, onEscReplaceElements);
    }
  };

  const rollupEventBtn = tripDayEventContent.getElement().querySelector(`.event__rollup-btn`);
  rollupEventBtn.addEventListener(`click`, () => {
    tripEvent.replaceChild(tripDayEventContentEdit.getElement(), tripDayEventContent.getElement());
    document.addEventListener(`keydown`, onEscReplaceElements);
  });

  const editEventForm = tripDayEventContentEdit.getElement();
  editEventForm.addEventListener(`submit`, () => {
    tripEvent.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
    document.removeEventListener(`keydown`, onEscReplaceElements);
  });

  render(tripEvent, tripDayEventContent, RenderPosition.BEFOREEND);
};

renderTripInfo();
renderMenu();
renderFilter();
renderSorting();
if (events.length > 0) {
  renderCards(DAYS_COUNT);
} else {
  renderFirstEventMessage();
}
