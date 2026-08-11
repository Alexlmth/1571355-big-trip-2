import { createElement } from '../render.js';

function createFilterItemTemplate(filter, currentFilterType) { //берет один объект фильтра и превращает его в один кусочек HTML с radio-кнопкой и label.
  const { type, name } = filter;
  const isChecked = type === currentFilterType ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  ) ;
}

function createFilterTemplate(filters, currentFilterType) { //создает полный шаблон формы фильтров, используя массив фильтров и активный фильтр.
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
//  создание класса FilterView, который будет отвечать за отображение фильтров на странице.
//   Класс содержит методы для получения шаблона фильтров, создания элемента DOM и удаления элемента из памяти.
export default class FilterView {
  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    this.filters = filters;
    this.currentFilterType = currentFilterType;
    this.onFilterTypeChange = onFilterTypeChange;
  }

  getTemplate() {
    return createFilterTemplate(this.filters, this.currentFilterType);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.addEventListener('change', this.filterTypeChangeHandler);
    }
    //  возвращает элемент DOM, который был создан на основе шаблона фильтров.
    //  Если элемент уже был создан ранее, то он будет возвращен без повторного создания.
    return this.element;
  }

  removeElement() {
    this.element = null;
  }

  filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.onFilterTypeChange(evt.target.value);
  };
}
