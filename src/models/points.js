class Points {
  constructor(events) {
    this._points = events;
  }

  getPoints() {
    return this._points;
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
}

export {Points};
