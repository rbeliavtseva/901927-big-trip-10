import {render} from '../utils/render.js';
import {CardEventContent} from '../components/card-event-content.js';
import {RenderPosition, Keycodes} from '../consts.js';
import {Event} from '../components/event.js';
import {generateOffers} from '../mock/event.js';
import {actionType} from '../consts.js';

class PointController {
  constructor(container, onDataChange, onViewChange, action) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._tripDayEventContent = null;
    this._tripDayEventContentEdit = null;
    this._action = action;
  }

  /**
   * Возвращает открытой форме редактирования исходный вид (точка маршрута)
   */
  setDefaultView() {
    if (this._container.firstChild === this._tripDayEventContentEdit.getElement()) {
      this._container.replaceChild(this._tripDayEventContent.getElement(), this._tripDayEventContentEdit.getElement());
    }
  }

  _renderTripDayEventContent(singleEvent) {
    const onEscReplaceElements = (evt) => {
      if (evt.keyCode === Keycodes.ESC_KEYCODE) {
        this._container.replaceChild(this._tripDayEventContent.getElement(), this._tripDayEventContentEdit.getElement());
        document.removeEventListener(`keydown`, onEscReplaceElements);
      }
    };

    let tripDayEventContent = null;
    if (this._action === actionType.EDIT) {
      tripDayEventContent = this._tripDayEventContent = new CardEventContent(singleEvent);

      /**
     * Функция по событию отправки формы заменяет существующий элемент на новый,
     * а затем снимает обработчик события закрытия по ESC
     */
      const onRollupButtonClick = () => {
        this._onViewChange();
        this._container.replaceChild(this._tripDayEventContentEdit.getElement(), this._tripDayEventContent.getElement());
        document.addEventListener(`keydown`, onEscReplaceElements);
      };
      tripDayEventContent.setClickHandler(onRollupButtonClick);
    }

    const tripDayEventContentEdit = this._tripDayEventContentEdit = new Event(singleEvent, this._action);
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
     * Функция по событию отправки формы заменяет существующий элемент на новый,
     * а затем снимает обработчик события закрытия по ESC
     * @param {object} evt - событие
     */
    const onTripEditFormSubmit = (evt) => {
      evt.preventDefault();

      if (this._action === actionType.EDIT) {
        this._container.replaceChild(this._tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
        document.removeEventListener(`keydown`, onEscReplaceElements);
      }
      const newPoint = {...singleEvent, ...this._tripDayEventContentEdit._eventData};
      this._onDataChange(singleEvent, newPoint);
    };

    /**
     * Функция по клику забирает value у элемента, по которому произошел клик,
     * и перезаписывает это значение, а затем перерендеривает форму редактирования
     * @param {object} evt - событие
     */
    const onEventTypeItemClick = (evt) => {
      const newPoint = {...singleEvent, eventType: evt.target.value, offers: generateOffers(evt.target.value)};
      this._tripDayEventContentEdit._eventData = newPoint;
      this._tripDayEventContentEdit.rerender();
    };

    /**
     * Функция по клику на кнопку Cancel отменяет все изменения, внесенные
     * в форму редактирования
     */
    const onTripEditFormCancelClick = () => {
      const oldPoint = singleEvent;
      this._tripDayEventContentEdit._eventData = oldPoint;
      this._tripDayEventContentEdit.rerender();
    };

    /**
     * Функция по клику на кнопку Cancel отменяет все изменения, внесенные
     * в форму редактирования
     */
    const onTripEditDeleteClick = () => {
      const oldPoint = singleEvent;
      this._onDataChange(oldPoint, null);
    };

    tripDayEventContentEdit.setSubmitHandler(onTripEditFormSubmit);
    tripDayEventContentEdit.setEventTypeClickHandler(onEventTypeItemClick);
    if (this._action === actionType.CREATE) {
      tripDayEventContentEdit.setCancelClickHandler(onTripEditFormCancelClick);
    } else {
      tripDayEventContentEdit.setCancelClickHandler(onTripEditDeleteClick);
    }

    if (this._action === actionType.CREATE) {
      render(this._container, tripDayEventContentEdit, RenderPosition.BEFOREEND);
    } else {
      render(this._container, tripDayEventContent, RenderPosition.BEFOREEND);
    }
  }

  render(point) {
    if (this._action !== actionType.CREATE) {
      /**
      * Функция удаляет элементы карточек точек маршрута
      */
      const removePoint = () => {
        if (this._container.hasChildNodes()) {
          this._container.firstChild.remove();
        }
      };
      removePoint();
    }

    this._renderTripDayEventContent(point, this._container);
  }
}

export {PointController};
