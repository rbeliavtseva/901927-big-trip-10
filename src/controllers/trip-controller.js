import {render} from '../utils/render.js';
import {TripCardDay} from '../components/card.js';
import {CardEvent} from '../components/card-event.js';
import {FirstEventMessage} from '../components/first-event-message';
import {Sort} from '../components/sort.js';
import {tripInfoData, defaultEvent} from '../mock/event.js';
import {RenderPosition, SortType, DAYS_COUNT, actionType} from '../consts.js';
import {PointController} from './point-controller.js';
import {HIDDEN_CLASS} from '../consts.js';

class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._pointControllers = [];

    this._createNewEvent();
  }

  /**
   * Функция по клику на кнопку New event создает новый event из дефолтного
   */
  _createNewEvent() {
    const newEventAddBtn = document.querySelector(`.trip-main__event-add-btn`);
    newEventAddBtn.addEventListener(`click`, () => {
      const sortTrip = this._container.querySelector(`.trip-events__trip-sort`);
      const pointController = new PointController(sortTrip, (oldPoint, newPoint) => this._onDataChange(oldPoint, newPoint), () => this._onViewChange(), actionType.CREATE);
      pointController.render(defaultEvent());
    });
  }

  _tripControllerRender(numberOfDays) {
    const sortTrip = new Sort();

    const renderSorting = () => {
      render(this._container, sortTrip, RenderPosition.BEFOREEND);
    };

    /**
     * Функция рендерит все карточки-контейнеры для каждого дня путешествия
     * @param {number} numberOfCards Количество дней путешествия
     */
    const renderCards = (numberOfCards) => {
      new Array(numberOfCards)
      .fill(``)
      .forEach((_, day) => {
        renderDayOfTrip(day);
      });
    };

    /**
     * Функция заполняет контейнер дня путешествия
     * @param {number} day Номер дня путешествия
     */
    const renderDayOfTrip = (day) => {
      const newDay = new TripCardDay(day, tripInfoData.date.startDate);
      const tripEventsList = newDay.getElement().querySelector(`.trip-events__list`);
      const filteredEvents = this._pointsModel.getPoints().filter((it) => it.date.day === day);
      if (filteredEvents.length > 0) {
        renderDayEvents(filteredEvents, tripEventsList);
      }

      render(this._container, newDay, RenderPosition.BEFOREEND);
    };

    /**
     * Функция заполнения событиями дня
     * @param {array} filteredEvents - массив событий, отфильтрованных по конкретному дню
     * @param {element} tripEventsList - контейнер
     */
    const renderDayEvents = (filteredEvents, tripEventsList) => {
      filteredEvents.forEach((event) => {
        const tripDayEvent = new CardEvent();
        const tripEvent = tripDayEvent.getElement();
        const pointController = new PointController(tripEvent, (oldPoint, newPoint) => this._onDataChange(oldPoint, newPoint), () => this._onViewChange(), actionType.EDIT);
        this._pointControllers.push(pointController);
        pointController.render(event);

        render(tripEventsList, tripDayEvent, RenderPosition.BEFOREEND);
      });
    };

    const renderFirstEventMessage = () => {
      render(this._container, new FirstEventMessage(), RenderPosition.BEFOREEND);
    };

    /**
     * Функция проверяет наличие существующих событий (длину массива events)
     * и в зависимости от результата рендерит карточки событий, либо сообщение о добавлении нового события
     * @param {array} tripEvents Массив событий
     * @return {boolean} В зависимости от наличия событий возвращает true или false
     */
    const checkExistingEvents = (tripEvents) => {
      if (tripEvents.length > 0) {
        return true;
      } else {
        renderFirstEventMessage();
        return false;
      }
    };

    /**
     * Функция удаления сообщения
     */
    const deleteEventMessage = () => {
      const eventMessage = this._container.querySelector(`.trip-events__msg`);
      if (eventMessage) {
        eventMessage.remove();
      }
    };

    /**
     * Функция сортирует элементы по убывающему значению цены
     * @param {array} eventItems Массив событий
     */
    const sortEventsByPrice = (eventItems) => {
      eventItems.sort((a, b) => b.price - a.price);
    };

    /**
     * Функция сортирует элементы по убывающему значению временного промежутка между датами
     * @param {array} eventItems Массив событий
     */
    const sortEventsByDuration = (eventItems) => {
      eventItems.sort((a, b) => (b.date.eventEndDate - b.date.eventStartDate) - (a.date.eventEndDate - a.date.eventStartDate));
    };

    /**
     * Функция удаляет элементы карточек точек маршрута
     */
    const removeElements = () => {
      const eventElements = this._container.querySelectorAll(`.trip-events__item`);
      const dayElements = this._container.querySelectorAll(`.day`);
      if (dayElements.length > 0) {
        dayElements.forEach((element) => {
          element.remove();
        });
      }
      if (eventElements.length > 0) {
        eventElements.forEach((element) => {
          element.remove();
        });
      }
    };

    /**
     * Функция сортировки элементов в зависимости от типа сортировки
     * @param {string} sortingType Массив событий
     */
    const sortEvents = (sortingType) => {
      removeElements();
      const eventsCopy = [...this._pointsModel.getPoints()];
      if (checkExistingEvents(eventsCopy)) {
        deleteEventMessage();
        switch (sortingType) {
          case SortType.EVENT:
            renderCards(numberOfDays);
            break;

          case SortType.PRICE:
            sortEventsByPrice(eventsCopy);
            renderDayEvents(eventsCopy, this._container);
            break;

          case SortType.TIME:
            sortEventsByDuration(eventsCopy);
            renderDayEvents(eventsCopy, this._container);
            break;
        }
      }
    };

    renderSorting();
    sortTrip.setSortTypeChangeHandler(sortEvents);
    sortEvents(SortType.EVENT);
  }

  render(numberOfDays) {
    const removeChildrens = () => {
      if (this._container.hasChildNodes()) {
        if (this._container.children.length > 1) {
          const tripSort = this._container.querySelector(`.trip-events__trip-sort`);
          tripSort.remove();
        }
      }
    };
    removeChildrens();

    this._tripControllerRender(numberOfDays);
  }

  /**
   * Приватный метод, который обновляет поле isFavourite и перерендеривает элемент
   * на основе нового значения
   * @param {object} oldPoint - объект
   * @param {object} newPoint - объект
   */
  _onDataChange(oldPoint, newPoint) {
    if (newPoint === null) {
      this._pointsModel.deletePoint(oldPoint.id);
    } else if (oldPoint !== null && newPoint !== null) {
      this._pointsModel.updatePoint(oldPoint.id, newPoint);
    }
    this.render(DAYS_COUNT);
  }

  /**
   * Приватный метод, который вызывает для каждого контроллера метод, возвращающий
   * к дефолтному виду
   */
  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  onActiveFilterChange() {
    this.render(DAYS_COUNT);
  }

  show() {
    if (this._container) {
      this._container.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._container) {
      this._container.classList.add(HIDDEN_CLASS);
    }
  }
}

export {TripController};
