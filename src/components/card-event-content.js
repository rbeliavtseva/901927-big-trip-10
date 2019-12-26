import {AbstractComponent} from './abstract-component.js';
import {formatTime} from '../utils/date-time-format.js';
import {checkEventTypeArticle, toUppercaseFirstLetter} from '../utils/events.js';

const createOfferMarkup = (offer) => {
  const {name, price} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

class CardEventContent extends AbstractComponent {
  constructor(eventData) {
    super();
    this._eventData = eventData;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }

  getTemplate() {
    const {eventType, date, offers, price, city, duration} = this._eventData;

    const offersMarkup = offers.length > 0
      ? offers.map((it) => createOfferMarkup(it)).join(`\n`)
      : ``;

    return (
      `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${toUppercaseFirstLetter(eventType)} ${checkEventTypeArticle(eventType)} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(date.eventStartDate).toISOString()}">${formatTime(date.eventStartDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(date.eventEndDate).toISOString()}">${formatTime(date.eventEndDate)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
    );
  }
}

export {CardEventContent};
