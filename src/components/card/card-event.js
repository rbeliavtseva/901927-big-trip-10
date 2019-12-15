import {createElement} from '../../utils/render.js';

export default class CardEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
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
