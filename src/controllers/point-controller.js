import {render} from '../utils/render.js';
import {CardEventContent} from '../components/card-event-content.js';
import {RenderPosition, Keycodes} from '../consts.js';
import {Event} from '../components/event.js';
import {generateOffers} from '../mock/event.js';

class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._tripDayEventContent = null;
    this._tripDayEventContentEdit = null;
  }

  /**
   * Возвращает открытой форме редактирования исходный вид (точка маршрута)
   */
  setDefaultView() {
    if (this._container.firstChild === this._tripDayEventContentEdit.getElement()) {
      this._container.replaceChild(this._tripDayEventContent.getElement(), this._tripDayEventContentEdit.getElement());
    }
  }

  /**
   * Функция рендерит два типа карточки для каждого ивента - сокращенную и форму редактирования
   * @param {object} singleEvent - одиночное событие из массива событий одного дня
   * @param {element} container - контейнер
   */
  _renderTripDayEventContent(singleEvent, container) {
    const tripDayEventContent = this._tripDayEventContent = new CardEventContent(singleEvent);
    const tripDayEventContentEdit = this._tripDayEventContentEdit = new Event(singleEvent);

    /**
     * Функция по клику на кнопку "избранное" записывает значение атрибута checked на элементе,
     * меняя его на противоположное. Вызывает метод _onDataChange, передывая в него полученное значение
    */
    const onFavoriteButtonClick = () => {
      const updatedFavorite = !this._container.querySelector(`.event__favorite-checkbox`).checked;
      const newPoint = {...singleEvent, isFavourite: updatedFavorite};
      this._onDataChange(singleEvent, newPoint);
    };
    tripDayEventContentEdit.setClickHandler(onFavoriteButtonClick);

    /**
     * Функция принимает событие и проверяет значение свойства keyCode,
     * в случае совпадения заменяя существующий элемент на новый, а затем снимает обработчик события
     * @param {object} evt - событие
     */
    const onEscReplaceElements = (evt) => {
      if (evt.keyCode === Keycodes.ESC_KEYCODE) {
        container.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
        document.removeEventListener(`keydown`, onEscReplaceElements);
      }
    };

    /**
     * Функция по событию отправки формы заменяет существующий элемент на новый,
     * а затем снимает обработчик события закрытия по ESC
     */
    const onRollupButtonClick = () => {
      this._onViewChange();
      container.replaceChild(tripDayEventContentEdit.getElement(), tripDayEventContent.getElement());
      document.addEventListener(`keydown`, onEscReplaceElements);
    };

    tripDayEventContent.setClickHandler(onRollupButtonClick);

    /**
     * Функция по событию отправки формы заменяет существующий элемент на новый,
     * а затем снимает обработчик события закрытия по ESC
     * @param {object} evt - событие
     */
    const onTripEditFormSubmit = (evt) => {
      evt.preventDefault();

      container.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
      document.removeEventListener(`keydown`, onEscReplaceElements);
      const newPoint = {...singleEvent, ...this._tripDayEventContentEdit._eventData};
      this._tripDayEventContent._eventData = newPoint;
      this._tripDayEventContent.rerender();
    };

    /**
     * Функция по клику забирает value у элемента, по которому произошел клик,
     * и перезаписывает это значение, а затем перерендеривает форму редактирования
     * @param {object} evt - событие
     */
    const onEventTypeItemClick = (evt) => {
      const newPoint = {...singleEvent, eventType: evt.target.value, offers: generateOffers(evt.target.value)};
      this._onDataChange(singleEvent, newPoint);
    };

    /**
     * Функция по клику на кнопку Cancel отменяет все изменения, внесенные
     * в форму редактирования
     */
    const onTripEditFormCancelClick = () => {
      const oldPoint = singleEvent;
      this._onDataChange(singleEvent, oldPoint);
    };

    tripDayEventContentEdit.setSubmitHandler(onTripEditFormSubmit);
    tripDayEventContentEdit.setEventTypeClickHandler(onEventTypeItemClick);
    tripDayEventContentEdit.setCancelClickHandler(onTripEditFormCancelClick);

    render(container, tripDayEventContent, RenderPosition.BEFOREEND);
  }

  render(point) {
    /**
     * Функция удаляет элементы карточек точек маршрута
     */
    const removePoint = () => {
      if (this._container.hasChildNodes()) {
        this._container.firstChild.remove();
      }
    };

    removePoint();
    this._renderTripDayEventContent(point, this._container);
  }
}

export {PointController};
