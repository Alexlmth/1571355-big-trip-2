import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const DateFormat = {
  MONTH_DAY: 'D MMM',
};

function getSortedPoints(points) {
  return points.slice().sort((pointA, pointB) => pointA.dateFrom - pointB.dateFrom);
}

function createTripTitle(points) {
  const sortedPoints = getSortedPoints(points);
  const destinations = sortedPoints.map((point) => point.destination.name);

  if (destinations.length <= 3) {
    return destinations.join(' &mdash; ');
  }

  return `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
}

function createTripDates(points) {
  const sortedPoints = getSortedPoints(points);
  const dateFrom = sortedPoints[0].dateFrom;
  const dateTo = sortedPoints[sortedPoints.length - 1].dateTo;

  return `${dayjs(dateFrom).format(DateFormat.MONTH_DAY)}&nbsp;&mdash;&nbsp;${dayjs(dateTo).format(DateFormat.MONTH_DAY)}`;
}

function calculateTripCost(points) {
  return points.reduce((total, point) => {
    const offersCost = point.offers.reduce((offersTotal, offer) => offersTotal + offer.price, 0);

    return total + point.price + offersCost;
  }, 0);
}

function createTripInfoTemplate(points) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createTripTitle(points)}</h1>

        <p class="trip-info__dates">${createTripDates(points)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTripCost(points)}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
