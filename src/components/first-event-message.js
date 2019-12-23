import {AbstractComponent} from './abstract-component.js';

class FirstEventMessage extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }
}

export {FirstEventMessage};
