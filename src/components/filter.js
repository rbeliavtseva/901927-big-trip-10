import {AbstractComponent} from './abstract-component.js';

const createFilterMarkup = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter"
        value="${name}"
        data-filter-type="${name}"
        ${isChecked ? `checked` : ``}>
      <label
        class="trip-filters__filter-label"
        for="filter-${name}">${name}
      </label>
    </div>`
  );
};

class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    const filtersMarkup = this._filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
    return (
      `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
      </form>`
    );
  }

  /**
   * Функция навешивает обработчики событий на элементы фильтра
   * @param {function} bind Функция, которая будет выполняться при клике на элемент
   */
  setFilterTypeChangeHandler(bind) {
    const sortFields = this.getElement().querySelectorAll(`input`);
    if (sortFields.length > 0) {
      sortFields.forEach((field) => {
        field.addEventListener(`click`, (evt) => {
          const filterType = evt.target.dataset.filterType;

          if (this._currentFilterType === filterType) {
            return;
          }

          this._currentFilterType = filterType;

          bind(this._currentFilterType);
        });
      });
    }
  }
}

export {Filters};
