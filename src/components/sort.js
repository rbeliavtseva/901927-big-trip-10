import {AbstractComponent} from './abstract-component.js';
import {SortType} from '../consts.js';

class Sort extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day"></span>

        <div class="trip-sort__item  trip-sort__item--event">
          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sorting-type = "${SortType.EVENT}" checked>
          <label class="trip-sort__btn" for="sort-event">
            Event
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sorting-type = "${SortType.TIME}">
          <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
            Time
          </label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sorting-type = "${SortType.PRICE}">
          <label class="trip-sort__btn" for="sort-price">
            Price
          </label>
        </div>

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  /**
   * Функция навешивает обработчики событий на элементы сортировки
   * @param {function} bind Функция, которая будет выполняться при клике на элемент
   */
  setSortTypeChangeHandler(bind) {
    const sortFields = this.getElement().querySelectorAll(`input`);
    if (sortFields.length > 0) {
      sortFields.forEach((field) => {
        field.addEventListener(`click`, (evt) => {
          const sortType = evt.target.dataset.sortingType;

          if (this._currentSortType === SortType) {
            return;
          }

          this._currentSortType = sortType;

          bind(this._currentSortType);
        });
      });
    }
  }
}

export {Sort};
