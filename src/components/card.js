import {createElement} from '../utils/render.js';
import {toShortDateTimeFormat, addDaysToDate} from '../utils/date-time-format.js';

class TripCardDay {
  constructor(day, tripInfoData) {
    this._day = day;
    this._tripInfoData = tripInfoData;
    this._element = null;
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

export {TripCardDay};
