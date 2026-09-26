import ApiService from './framework/api-service.js';

const Method = {
  PUT: 'PUT',
};

function adaptDestinationToClient(destination) {
  return {
    ...destination,
    photos: destination.pictures.map((picture) => picture.src),
  };
}

function adaptPointToClient(point, destinations, offers) {
  const destination = destinations.find((destinationItem) => destinationItem.id === point.destination);
  const offersByType = offers.find((offerItem) => offerItem.type === point.type)?.offers ?? [];

  return {
    id: point.id,
    dateFrom: new Date(point.date_from),
    dateTo: new Date(point.date_to),
    type: point.type,
    price: point.base_price,
    destination,
    offers: point.offers.map((offerId) => offersByType.find((offer) => offer.id === offerId)).filter(Boolean),
    isFavorite: point.is_favorite,
  };
}

function adaptPointToServer(point) {
  return {
    'id': point.id,
    'date_from': point.dateFrom.toISOString(),
    'date_to': point.dateTo.toISOString(),
    'type': point.type,
    'base_price': point.price,
    'destination': point.destination.id,
    'offers': point.offers.map((offer) => offer.id),
    'is_favorite': point.isFavorite,
  };
}

export default class TripApiService extends ApiService {
  async destinations() {
    const destinations = await this._load({url: 'destinations'})
      .then(ApiService.parseResponse);

    return destinations.map(adaptDestinationToClient);
  }

  async offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async points(destinations, offers) {
    const points = await this._load({url: 'points'})
      .then(ApiService.parseResponse);

    return points.map((point) => adaptPointToClient(point, destinations, offers));
  }

  async updatePoint(point, destinations, offers) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const updatedPoint = await ApiService.parseResponse(response);

    return adaptPointToClient(updatedPoint, destinations, offers);
  }
}
