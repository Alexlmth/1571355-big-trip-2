import { getRandomArrayElement } from '../utils.js';
import { getDestinationsList } from './destination.js';
import { getOffersList } from './offer.js';

const mockPoints = [
  {
    dateFrom: new Date(2026, 4, 14, 8, 15),
    dateTo: new Date(2026, 4, 14, 11, 45),
    type: 'bus',
    price: 320,
    destination: 1,
    offers: [6, 5],
    isFavorite: true,
  },
  {
    dateFrom: new Date(2026, 4, 14, 15, 0),
    dateTo: new Date(2026, 4, 15, 10, 30),
    type: 'check-in',
    price: 1320,
    destination: 2,
    offers: [23, 24],
    isFavorite: false,
  },
  {
    dateFrom: new Date(2026, 4, 15, 12, 10),
    dateTo: new Date(2026, 4, 15, 14, 25),
    type: 'drive',
    price: 760,
    destination: 4,
    offers: [27, 29, 28],
    isFavorite: false,
  },
  {
    dateFrom: new Date(2026, 5, 3, 6, 40),
    dateTo: new Date(2026, 5, 3, 9, 55),
    type: 'flight',
    price: 1840,
    destination: 5,
    offers: [17, 16],
    isFavorite: true,
  },
  {
    dateFrom: new Date(2026, 5, 3, 13, 20),
    dateTo: new Date(2026, 5, 3, 15, 5),
    type: 'restaurant',
    price: 145,
    destination: 5,
    offers: [32, 35, 31],
    isFavorite: true,
  },
  {
    dateFrom: new Date(2026, 6, 18, 19, 30),
    dateTo: new Date(2026, 6, 19, 8, 10),
    type: 'ship',
    price: 970,
    destination: 4,
    offers: [38, 37],
    isFavorite: false,
  },
  {
    dateFrom: new Date(2026, 6, 19, 10, 0),
    dateTo: new Date(2026, 6, 19, 12, 35),
    type: 'sightseeing',
    price: 210,
    destination: 4,
    offers: [],
    isFavorite: false,
  },
  {
    dateFrom: new Date(2026, 8, 7, 9, 20),
    dateTo: new Date(2026, 8, 7, 9, 55),
    type: 'taxi',
    price: 85,
    destination: 5,
    offers: [2, 3],
    isFavorite: false,
  },
  {
    dateFrom: new Date(2026, 10, 22, 16, 45),
    dateTo: new Date(2026, 10, 22, 20, 15),
    type: 'train',
    price: 640,
    destination: 3,
    offers: [11, 10, 13],
    isFavorite: false,
  },
];

const getDestinationById = (id) =>
  getDestinationsList().find((item) => item.id === id);

const getOfferById = (id) => {
  for (const category of getOffersList()) {
    const targetOffer = category.offers.find((offer) => offer.id === id);

    if (targetOffer) {
      return targetOffer;
    }
  }
};

class MockPoint {
  constructor({
    dateFrom,
    dateTo,
    type,
    destination,
    price,
    offers,
    isFavorite,
  }) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.type = type;
    this.price = price;
    this.isFavorite = isFavorite;
    this.destination = getDestinationById(destination);
    this.offers = offers.map((id) => getOfferById(id));
  }
}

const getRandomPoint = () => new MockPoint(getRandomArrayElement(mockPoints));

export { getRandomPoint };
