import AbstractView from '../framework/view/abstract-view.js';
import { capitalize } from '../utils.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const DateFormat = {
  DATE: 'MMM DD',
  TIME: 'HH:mm',
};

dayjs.extend(duration);

function humanizeDate(date) {
  return dayjs(date).format(DateFormat.DATE).toUpperCase();
}

function humanizeTime(date) {
  return dayjs(date).format(DateFormat.TIME);
}

function getDateTime(date) {
  return dayjs(date).toISOString();
}

function getDuration(dateFrom, dateTo) {
  const pointDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  const days = Math.floor(pointDuration.asDays());
  const hours = pointDuration.hours();
  const minutes = pointDuration.minutes();

  const formattedDays = String(days).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  if (days > 0) {
    return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
  }

  if (hours > 0) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }

  return `${formattedMinutes}M`;
}

function createOfferTemplate(offer) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  );
}

function createOffersTemplate(offers) {
  if (offers.length === 0) {
    return '';
  }

  const offersTemplate = offers.map((offer) => createOfferTemplate(offer)).join('');

  return (
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersTemplate}
    </ul>`
  );
}

function createEventItemTemplate(point) {
  const {
    dateFrom,
    dateTo,
    type,
    price,
    destination,
    offers,
    isFavorite,
  } = point;
  const favoriteClassName = isFavorite ? ' event__favorite-btn--active' : '';
  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDateTime(dateFrom)}">${humanizeDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(type)} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDateTime(dateFrom)}">${humanizeTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDateTime(dateTo)}">${humanizeTime(dateTo)}</time>
          </p>
          <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${offersTemplate}
        <button class="event__favorite-btn${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  ) ;
}

export default class EventItemView extends AbstractView {
  #point = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItemTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };

}
