import { render } from '../render.js';
import SortView from '../view/sort-view.js';

export default class SortPresenter {
  constructor({ tripEventsContainer }) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new SortView(), this.tripEventsContainer);
  }
}
