import {AbstractComponent} from './abstract-component.js';

class CardEvent extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
      </li>`
    );
  }
}

export {CardEvent};
