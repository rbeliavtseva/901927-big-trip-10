import {toTripInfoDateFormat} from '../utils/date-time-format.js';
import {createElement} from '../utils/render.js';

export default class TripInfo {
  constructor(eventData) {
    this._eventData = eventData;
    this._element = null;
  }

  getTemplate() {
    const {date, cities} = this._eventData;

    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${cities.join(` &mdash; `)}</h1>

        <p class="trip-info__dates">${toTripInfoDateFormat(date.startDate, date.endDate)}</p>
      </div>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}

export {TripInfo};
