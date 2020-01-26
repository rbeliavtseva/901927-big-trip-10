import {generateFilters} from '../mock/filter.js';
import {Filters} from '../components/filter.js';
import {render} from '../utils/render.js';
import {RenderPosition} from '../consts.js';

class FilterController {
  constructor(container, pointsModel, onActiveFilterChange) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._onActiveFilterChange = onActiveFilterChange;
  }

  render() {
    const filters = new Filters(generateFilters());

    const filterEvents = (filterType) => {
      this._pointsModel.changeActiveFilter(filterType);
      this._onActiveFilterChange();
    };

    filters.setFilterTypeChangeHandler(filterEvents);
    render(this._container, filters, RenderPosition.BEFOREEND);
  }
}

export {FilterController};
