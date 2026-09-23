import { render, remove, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #destinations = null;
  #offers = null;
  #pointListContainer = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = Mode.DEFAULT;

  #eventItemComponent = null;
  #eventEditComponent = null;

  constructor({ pointListContainer, point, destinations, offers, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point = this.#point) {
    this.#point = point;

    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventItemComponent = new EventItemView({
      point: this.#point,
      onEditClick: this.#replaceCardToForm,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#eventEditComponent = new EventEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#formSubmitHandler,
      onRollupClick: this.#replaceFormToCard,
    });

    if (prevEventItemComponent === null || prevEventEditComponent === null) {
      render(this.#eventItemComponent, this.#pointListContainer);
      return;
    }

    replace(this.#eventItemComponent, prevEventItemComponent);
    remove(prevEventItemComponent);
    remove(prevEventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#eventItemComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceFormToCard = () => {
    replace(this.#eventItemComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replaceCardToForm = () => {
    this.#onModeChange();
    replace(this.#eventEditComponent, this.#eventItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #favoriteClickHandler = () => {
    this.#onDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #formSubmitHandler = (updatedPoint) => {
    this.#onDataChange(updatedPoint);
  };
}
