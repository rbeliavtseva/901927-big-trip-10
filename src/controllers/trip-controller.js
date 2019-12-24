import {AbstractComponent} from '../components/abstract-component.js';
import {render} from '../utils/render.js';
import {TripCardDay} from '../components/card.js';
import {CardEvent} from '../components/card-event.js';
import {CardEventContent} from '../components/card-event-content.js';
import {FirstEventMessage} from '../components/first-event-message';
import {Event} from '../components/event.js';
import {tripInfoData} from '../mock/event.js';
import {RenderPosition, Keycodes} from '../consts.js';

class TripController extends AbstractComponent {
  constructor(container) {
    super();
    this._container = container;
  }

  render(eventsArray, days) {
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
      const filteredEvents = eventsArray.filter((it) => it.date.day === day);
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
        renderTripDayEventContent(event, tripEvent);

        render(tripEventsList, tripDayEvent, RenderPosition.BEFOREEND);
      });
    };

    /**
     * Функция рендерит два типа карточки для каждого ивента - сокращенную и форму редактирования
     * @param {object} singleEvent - одиночное событие из массива событий одного дня
     * @param {element} tripEvent - контейнер
     */
    const renderTripDayEventContent = (singleEvent, tripEvent) => {
      const tripDayEventContent = new CardEventContent(singleEvent);
      const tripDayEventContentEdit = new Event(singleEvent);

      /**
       * Функция принимает событие и проверяет значение свойства keyCode,
       * в случае совпадения заменяя существующий элемент на новый, а затем снимает обработчик события
       * @param {object} evt - событие
       */
      const onEscReplaceElements = (evt) => {
        if (evt.keyCode === Keycodes.ESC_KEYCODE) {
          tripEvent.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
          document.removeEventListener(`keydown`, onEscReplaceElements);
        }
      };

      /**
       * Функция по событию отправки формы заменяет существующий элемент на новый,
       * а затем снимает обработчик события закрытия по ESC
       */
      const onRollupButtonClick = () => {
        tripEvent.replaceChild(tripDayEventContentEdit.getElement(), tripDayEventContent.getElement());
        document.addEventListener(`keydown`, onEscReplaceElements);
      };

      tripDayEventContent.setClickHandler(onRollupButtonClick);


      /**
       * Функция по событию отправки формы заменяет существующий элемент на новый,
       * а затем снимает обработчик события закрытия по ESC
       */
      const onTripEditFormSubmit = () => {
        tripEvent.replaceChild(tripDayEventContent.getElement(), tripDayEventContentEdit.getElement());
        document.removeEventListener(`keydown`, onEscReplaceElements);
      };

      tripDayEventContentEdit.setSubmitHandler(onTripEditFormSubmit);

      render(tripEvent, tripDayEventContent, RenderPosition.BEFOREEND);
    };

    const renderFirstEventMessage = () => {
      render(this._container, new FirstEventMessage(), RenderPosition.BEFOREEND);
    };

    /**
     * Функция проверяет наличие существующих событий (длину массива events)
     * и в зависимости от результата рендерит карточки событий, либо сообщение о добавлении нового события
     * @param {array} events Массив сгенерированных событий
     * @param {number} numberOfDays Число дней путешествия
     */
    const checkExistingEvents = (events, numberOfDays) => {
      if (events.length > 0) {
        renderCards(numberOfDays);
      } else {
        renderFirstEventMessage();
      }
    };
    checkExistingEvents(eventsArray, days);
  }
}

export {TripController};
