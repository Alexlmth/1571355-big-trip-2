import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const filterPresenter = new FilterPresenter({
  filtersContainer,
});
const sortPresenter = new SortPresenter({
  tripEventsContainer,
});
const tripPresenter = new TripPresenter({
  tripEventsContainer,
  pointsModel,
});

filterPresenter.init();
sortPresenter.init();
tripPresenter.init();
