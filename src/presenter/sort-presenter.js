import { render } from '../framework/render.js';
import { SortType } from '../const.js';
import SortView from '../view/sort-view.js';

const DEFAULT_SORT_TYPE = SortType.DAY;

export default class SortPresenter {
  constructor({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
    this.currentSortType = DEFAULT_SORT_TYPE;
  }

  init() {
    render(new SortView({
      sortItems: Object.values(SortType),
      currentSortType: this.currentSortType,
    }), this.tripEventsContainer);
  }
}
