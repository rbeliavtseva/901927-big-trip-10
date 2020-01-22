import {AbstractSmartComponent} from './abstract-smart-component.js';
import {toEventDateFormat} from '../utils/date-time-format.js';
import {checkEventTypeArticle, toUppercaseFirstLetter} from '../utils/events.js';
import {EventTypes, Cities} from '../mock/event.js';

const createOfferMarkup = (offer) => {
  const {type, name, price} = offer;
  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${type}-1"
        type="checkbox"
        name="event-offer-${type}"
      />
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createPicturesMarkup = (pictures) => {
  return (
    `<img class="event__photo" src="${pictures}" alt="Event photo"></img>`
  );
};

const createEventTypesMarkup = (eventTypes, id, isChecked) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${eventTypes}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventTypes}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${eventTypes}" for="event-type-${eventTypes}-${id}">${toUppercaseFirstLetter(eventTypes)}</label>
    </div>`
  );
};

const createDestinationListMarkup = (city) => {
  return (
    `<option value="${toUppercaseFirstLetter(city)}"></option>`
  );
};

class Event extends AbstractSmartComponent {
  constructor(eventData) {
    super();
    this._eventData = eventData;
    this._setEventTypeClickHandler = null;
    this._setSubmitHandler = null;
    this._setClickHandler = null;
  }

  recoveryListeners() {
    this.setEventTypeClickHandler(this._setEventTypeClickHandler);
    this.setSubmitHandler(this._setSubmitHandler);
    this.setClickHandler(this._setClickHandler);
  }

  setEventTypeClickHandler(handler) {
    const eventTypeInputs = this.getElement().querySelectorAll(`.event__type-input`);
    eventTypeInputs.forEach((element) => {
      element.addEventListener(`click`, handler);
    });

    this._setEventTypeClickHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._setSubmitHandler = handler;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);

    this._setClickHandler = handler;
  }

  getTemplate() {
    const {eventType, city, date, offers, pictures, description, price, isFavourite, id} = this._eventData;

    const offersMarkup = offers.length > 0
      ? offers.map((it) => createOfferMarkup(it)).join(`\n`)
      : ``;

    const picturesMarkup = pictures.map((it) => createPicturesMarkup(it)).join(`\n`);

    const eventTypesMarkupTransfer = EventTypes.Transport.map((it) => createEventTypesMarkup(it, id, it === eventType)).join(`\n`);

    const eventTypesMarkupActivity = EventTypes.Activity.map((it) => createEventTypesMarkup(it, id, it === eventType)).join(`\n`);

    const destinationList = Cities.map((it) => createDestinationListMarkup(it)).join(`\n`);

    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
                  ${eventTypesMarkupTransfer}
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>
                  ${eventTypesMarkupActivity}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">
                ${toUppercaseFirstLetter(eventType)} ${checkEventTypeArticle(eventType)}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
              <datalist id="destination-list-${id}">
                ${destinationList}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${toEventDateFormat(date.eventStartDate)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${toEventDateFormat(date.eventEndDate)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>

            <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavourite ? `checked` : `` }>
            <label class="event__favorite-btn" for="event-favorite-${id}">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>
          </header>
          <section class="event__details">

            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${offersMarkup}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${picturesMarkup}
                </div>
              </div>
            </section>
          </section>
        </form>`
    );
  }
}

export {Event};
