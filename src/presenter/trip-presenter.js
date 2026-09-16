import { render, remove } from '../framework/render.js';
import { FilterType, NoPointTextType } from '../const.js';
import { filterPoints } from '../utils.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import TripListView from '../view/trip-list-view.js';

export default class TripPresenter {
  tripListComponent = null;
  noPointComponent = null;

  constructor({ tripEventsContainer, pointsModel }) {
    this.tripEventsContainer = tripEventsContainer; // куда tripEventsContainer = document.querySelector('.trip-events');<section class="trip-events">
    this.pointsModel = pointsModel; //что import PointsModel from './model/points-model.js';класс с тремя рандомными точками
    this.points = [];
    this.destinations = [];
    this.offers = [];
    this.pointPresenters = new Map();
  }
  //Берет точки из модели.
  //Копирует их в this.points.
  //Запускает отрисовку списка.

  init(filterType = FilterType.EVERYTHING) {
    this.points = filterPoints(this.pointsModel.points, filterType);
    this.destinations = [...this.pointsModel.destinations];
    this.offers = [...this.pointsModel.offers];
    this.clearEventsList();
    this.renderEventsList(filterType);
  }

  clearEventsList() {
    remove(this.tripListComponent);
    remove(this.noPointComponent);

    this.pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.pointPresenters.clear();
  }

  renderEventsList(filterType) {
    if (this.points.length === 0) {
      this.noPointComponent = new MessageView({
        message: NoPointTextType[filterType],
      });
      render(this.noPointComponent, this.tripEventsContainer);
      return;
    }

    this.tripListComponent = new TripListView();
    render(this.tripListComponent, this.tripEventsContainer);//отрисовывает ul с классом trip-events__list в section class="trip-events"

    for (const point of this.points) {
      const pointPresenter = new PointPresenter({
        pointListContainer: this.tripListComponent.element,
        point,
        destinations: this.destinations,
        offers: this.offers,
        onDataChange: this.handlePointChange,
        onModeChange: this.resetView,
      });

      pointPresenter.init();
      this.pointPresenters.set(point.id, pointPresenter);
    }
  }

  handlePointChange = (updatedPoint) => {
    this.pointsModel.points = this.pointsModel.points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
    this.points = this.points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );

    this.pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  resetView = () => {
    this.pointPresenters.forEach((pointPresenter) => pointPresenter.resetView());
  };
}
