import {createElement} from '../utils/render.js';

class CardEvent {
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
    this._element.remove();
    this._element = null;
  }
}

export {CardEvent};
