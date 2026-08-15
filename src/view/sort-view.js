import { createElement } from '../render.js';
import { SortType } from '../const.js';

function getSortName(sortType) {
  return sortType === SortType.OFFER ? 'Offers' : sortType[0].toUpperCase() + sortType.slice(1);
}

function createSortItemTemplate(sortType, currentSortType) {
  const isChecked = sortType === currentSortType ? 'checked' : '';
  const isDisabled = sortType === SortType.EVENT || sortType === SortType.OFFER ? 'disabled' : '';

  return (
    `<div class="trip-sort__item trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${sortType}">${getSortName(sortType)}</label>
    </div>`
  );
}

function createSortTemplate(sortItems, currentSortType) {
  const sortItemsTemplate = sortItems
    .map((sortType) => createSortItemTemplate(sortType, currentSortType))
    .join('');

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView {
  constructor({ sortItems, currentSortType }) {
    this.sortItems = sortItems;
    this.currentSortType = currentSortType;
  }

  getTemplate() {
    return createSortTemplate(this.sortItems, this.currentSortType);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
