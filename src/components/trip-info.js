import {AbstractComponent} from './abstract-component.js';
import {toTripInfoDateFormat} from '../utils/date-time-format.js';

class TripInfo extends AbstractComponent {
  constructor(eventData) {
    super();
    this._eventData = eventData;
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
}

export {TripInfo};
