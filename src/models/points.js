import {FilterNames} from '../mock/filter.js';

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

  updatePoint(id, point) {
    const pointById = this._points.filter((it) => it.id === id);
    if (pointById) {
      const updatedPoint = {...pointById, ...point};
      this._points = {...this._points, updatedPoint};
    }
  }

  changeActiveFilter(filterType) {
    this._activeFilter = filterType;
  }
}

export {Points};
