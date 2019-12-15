import {createElement} from '../../utils/render.js';

export default class TripCardDay {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._day + 1}</span>
          <time class="day__date" datetime="2019-03-18">MAR 18</time>
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
    this._element = null;
  }
}
