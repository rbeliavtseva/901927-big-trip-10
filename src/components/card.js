import {AbstractComponent} from './abstract-component.js';
import {toShortDateTimeFormat, addDaysToDate} from '../utils/date-time-format.js';

class TripCardDay extends AbstractComponent {
  constructor(day, tripInfoData) {
    super();
    this._day = day;
    this._tripInfoData = tripInfoData;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._day + 1}</span>
          <time class="day__date" datetime="2019-03-18">${toShortDateTimeFormat(addDaysToDate(this._tripInfoData, this._day))}</time>
        </div>

        <ul class="trip-events__list">

        </ul>
      </li>`
    );
  }
}

export {TripCardDay};
