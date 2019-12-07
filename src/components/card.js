import {formatTime, toISOstring, toCardTimePassedFormat} from '../util.js';

const createOffersMarkup = (offer) => {
  const {name, price} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createEventMarkup = (eventData) => {
  const {eventType, date, offers, price} = eventData;

  const offersMarkup = offers.length > 0
    ? offers.map((it) => createOffersMarkup(it)).join(`\n`)
    : ``;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi to airport</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${toISOstring(date.eventStartDate)}">${formatTime(date.eventStartDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${toISOstring(date.eventEndDate)}">${formatTime(date.eventEndDate)}</time>
          </p>
          <p class="event__duration">${toCardTimePassedFormat(date.eventStartDate, date.eventEndDate)}</p>
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
      </div>
    </li>`
  );
};

export const createTripCardTemplate = (events, day) => {

  const eventsMarkup = events.length > 0
    ? events.map((it) => createEventMarkup(it)).join(`\n`)
    : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day + 1}</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">
        ${eventsMarkup}
      </ul>
    </li>
  </li>`
  );
};
