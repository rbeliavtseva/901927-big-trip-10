import {FilterNames} from '../mock/filter.js';
import {generatePictures, generateDescriptionText, startDate} from '../mock/event.js';
import {NUMBER_OF_PICTURES} from '../consts.js';

class Points {
  constructor(events) {
    this._points = events;
    this._activeFilter = null;

    this.changeActiveFilter(FilterNames[0]);
  }

  getPoints() {
    switch (this._activeFilter) {
      case FilterNames[0]:
        return this._points;
      case FilterNames[1]:
        return this._points.filter((it) => it.id % 2 === 0); // it.date.eventStartDate > Date.now());
      case FilterNames[2]:
        return this._points.filter((it) => it.id % 2 === 1); // it.date.eventStartDate < Date.now());
      default:
        return null;
    }
  }

  getPoint(id) {
    const pointById = this._points.filter((it) => it.id === id);
    if (pointById) {
      return pointById;
    } else {
      return null;
    }
  }

  /**
   * Функция обновляет точку маршрута
   * @param {number} id Идентификатор
   * @param {object} point Текущая точка маршрута
   */
  updatePoint(id, point) {
    const pointById = this._points.filter((it) => it.id === id);
    if (pointById.length > 0) {
      const updatedPoint = {...pointById[0], ...point};
      const pointsCopy = [...this._points];
      pointsCopy.splice(pointById[0].id, 1, updatedPoint);
      this._points = pointsCopy;
    } else {
      let newId = 0;
      if (this._points.length > 0) {
        newId = this._points.sort((a, b) => b.id - a.id)[0].id + 1;
      }
      const diffTime = Math.abs(point.date.eventStartDate - startDate);
      const dayNumber = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
      const updatedPoint = {
        ...point,
        description: generateDescriptionText(),
        pictures: generatePictures(NUMBER_OF_PICTURES),
        id: newId,
        date: {eventStartDate: point.date.eventStartDate, day: dayNumber, eventEndDate: point.date.eventEndDate}};
      this._points.push(updatedPoint);
    }
  }

  changeActiveFilter(filterType) {
    this._activeFilter = filterType;
  }

  deletePoint(id) {
    const pointById = this._points.filter((it) => it.id === id);
    if (pointById) {
      const updatedPoints = this._points.filter((it) => it.id !== id);
      this._points = updatedPoints;
    }
  }
}

export {Points};
