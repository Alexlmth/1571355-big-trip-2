import { createElement } from '../render.js';
import { EventTypes, DEFAULT_EVENT_TYPE } from '../const.js';
import { capitalize } from '../utils.js';

function createEventTypeTemplate(eventType, currentType, pointId) {
  const isChecked = eventType === currentType ? 'checked' : '';

  return (
    `<div class="event__type-item">
      <input id="event-type-${eventType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${isChecked}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${pointId}">${capitalize(eventType)}</label>
    </div>`
  );
}

function createDestinationOptionTemplate(destination) {
  return `<option value="${destination.name}"></option>`;
}

function createOfferTemplate(offer, pointId) {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${pointId}" type="checkbox" name="event-offer-${offer.id}">
      <label class="event__offer-label" for="event-offer-${offer.id}-${pointId}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
}

function createOffersTemplate(type, offers, pointId) {
  const offersByType = offers.find((offerItem) => offerItem.type === type);

  if (!offersByType) {
    return '';
  }

  if (offersByType.offers.length === 0) {
    return '';
  }

  const offersTemplate = offersByType.offers
    .map((offer) => createOfferTemplate(offer, pointId))
    .join('');

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`
  );
}

function createEventCreateTemplate({ destinations, offers, pointId }) {
  const eventTypesTemplate = EventTypes
    .map((eventType) => createEventTypeTemplate(eventType, DEFAULT_EVENT_TYPE, pointId))
    .join('');
  const destinationsTemplate = destinations
    .map((destination) => createDestinationOptionTemplate(destination))
    .join('');
  const offersTemplate = createOffersTemplate(DEFAULT_EVENT_TYPE, offers, pointId);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${DEFAULT_EVENT_TYPE}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${pointId}">
              ${capitalize(DEFAULT_EVENT_TYPE)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="" list="destination-list-${pointId}">
            <datalist id="destination-list-${pointId}">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${pointId}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>

        <section class="event__details">
          ${offersTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class EventCreateView {
  constructor({ destinations, offers, pointId }) {
    this.destinations = destinations;
    this.offers = offers;
    this.pointId = pointId;
  }

  getTemplate() {
    return createEventCreateTemplate({
      destinations: this.destinations,
      offers: this.offers,
      pointId: this.pointId,
    });
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
