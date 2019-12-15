import {createElement} from '../utils/render.js';

const createMenuMarkup = (item, isActive) => {
  const {name} = item;

  return (
    `<a class="trip-tabs__btn
      trip-tabs__btn
      ${isActive ? `--active` : ``}"
      href="#">
        ${name}
      </a>`
  );
};

export default class SiteMenu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  getTemplate() {
    const menuMarkup = this._menuItems.map((it, i) => createMenuMarkup(it, i === 0)).join(`\n`);

    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMarkup}
      </nav>`
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
