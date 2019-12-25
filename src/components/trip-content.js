import {AbstractComponent} from './abstract-component.js';

class TripContent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<ul class="trip-days">
      </ul>`
    );
  }
}

export {TripContent};
