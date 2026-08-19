import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

//  создание класса FilterPresenter, который будет отвечать за отображение фильтров на странице.
export default class FilterPresenter {
  constructor({ filtersContainer }) {
    this.filtersContainer = filtersContainer;
    this.currentFilterType = DEFAULT_FILTER_TYPE;
  }

  init() {
    render(new FilterView({
      filters: Object.values(FilterType),
      currentFilterType: this.currentFilterType,
      onFilterTypeChange: this.handleFilterTypeChange,
    }), this.filtersContainer);
  }

  handleFilterTypeChange = (filterType) => {
    this.currentFilterType = filterType;
  };
}
