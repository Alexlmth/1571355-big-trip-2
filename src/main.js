import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import TripApiService from './trip-api-service.js';

const AUTHORIZATION = `Basic ${crypto.randomUUID()}`;
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

newEventButton.disabled = true;

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel({ tripApiService });
const filterModel = new FilterModel();

let filterPresenter = null;

const tripPresenter = new TripPresenter({
  tripEventsContainer,
  pointsModel,
  filterModel,
  onDataChange: () => {
    filterPresenter.init();
  },
  onNewPointDestroy: () => {
    newEventButton.disabled = false;
  },
});
filterPresenter = new FilterPresenter({
  filtersContainer,
  pointsModel,
  filterModel,
  onFilterTypeChange: () => {
    tripPresenter.init();
  },
});
async function initApplication() {
  filterPresenter.init();
  tripPresenter.init();

  await pointsModel.init();

  filterPresenter.init();
  tripPresenter.init();
  newEventButton.disabled = pointsModel.isLoadingError;
}

initApplication();

newEventButton.addEventListener('click', () => {
  newEventButton.disabled = true;
  tripPresenter.createPoint();
  filterPresenter.init();
});
