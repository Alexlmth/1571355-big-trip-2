import { getRandomPoint } from '../mock/point.js';
import { getDestinationsList } from '../mock/destination.js';
import { getOffersList } from '../mock/offer.js';
import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  destinations = getDestinationsList();
  offers = getOffersList();
}
