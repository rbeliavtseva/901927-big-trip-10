import {FilterNames} from '../consts.js';
import {generatePictures, generateDescriptionText, startDate} from '../mock/event.js';
import {NUMBER_OF_PICTURES, MsToDays} from '../consts.js';

class Points {
  constructor(events) {
    this._points = events;
    this._activeFilter = null;

    this.changeActiveFilter(FilterNames.Everything);
  }

  getPoints() {
    switch (this._activeFilter) {
      case FilterNames.Everything:
        return this._points;
      case FilterNames.Past:
        return this._points.filter((it) => new Date(it.date.eventStartDate) < new Date(Date.now()));
      case FilterNames.Future:
        return this._points.filter((it) => new Date(it.date.eventStartDate) > new Date(Date.now()));
      default:
        return null;
    }
  }

  getPoint(id) {
    const point = this._points.filter((it) => it.id === id);
    if (point) {
      return point;
    } else {
      return null;
    }
  }

  /**
   * Функция обновляет точку маршрута
   * @param {number} id Идентификатор
   * @param {object} newPoint Текущая точка маршрута
   */
  updatePoint(id, newPoint) {
    const point = this._points.filter((it) => it.id === id);
    if (point.length > 0) {
      const updatedPoint = {...point[0], ...newPoint};
      const pointsCopy = [...this._points];
      pointsCopy.splice(point[0].id, 1, updatedPoint);
      this._points = pointsCopy;
    } else {
      let newId = 0;
      if (this._points.length > 0) {
        newId = Math.max(...this._points.map((it) => it.id)) + 1;
      }
      const diffTime = Math.abs(newPoint.date.eventStartDate - startDate);
      const dayNumber = Math.ceil(diffTime / MsToDays) - 1;
      const updatedPoint = {
        ...newPoint,
        description: generateDescriptionText(),
        pictures: generatePictures(NUMBER_OF_PICTURES),
        id: newId,
        date: {
          eventStartDate: newPoint.date.eventStartDate,
          day: dayNumber,
          eventEndDate: newPoint.date.eventEndDate
        }
      };
      this._points.push(updatedPoint);
    }
  }

  changeActiveFilter(filterType) {
    this._activeFilter = filterType;
  }

  deletePoint(id) {
    const point = this._points.filter((it) => it.id === id);
    if (point) {
      const updatedPoints = this._points.filter((it) => it.id !== id);
      this._points = updatedPoints;
    }
  }
}

export {Points};
