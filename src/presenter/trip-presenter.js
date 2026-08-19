import { render } from '../render.js';
import EventCreateView from '../view/event-create-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import TripListView from '../view/trip-list-view.js';

export default class TripPresenter {
  tripListComponent = new TripListView();//создает экземпляр класса TripListView, который создает ul с классом trip-events__list  return '<ul class="trip-events__list"></ul>';

  constructor({ tripEventsContainer, pointsModel }) {
    this.tripEventsContainer = tripEventsContainer; // куда tripEventsContainer = document.querySelector('.trip-events');<section class="trip-events">
    this.pointsModel = pointsModel; //что import PointsModel from './model/points-model.js';класс с тремя рандомными точками
    this.points = [];
    this.destinations = [];
    this.offers = [];
  }
  //Берет точки из модели.
  //Копирует их в this.points.
  //Запускает отрисовку списка.

  init() {
    this.points = [...this.pointsModel.points];
    this.destinations = [...this.pointsModel.destinations];
    this.offers = [...this.pointsModel.offers];
    this.renderEventsList();
  }

  renderEventsList() {
    render(this.tripListComponent, this.tripEventsContainer);//отрисовывает ul с классом trip-events__list в section class="trip-events"
    render(new EventEditView({
      point: this.points[0],
      destinations: this.destinations,
      offers: this.offers,
    }), this.tripListComponent.getElement());
    render(new EventCreateView({
      destinations: this.destinations,
      offers: this.offers,
      pointId: crypto.randomUUID(),
    }), this.tripListComponent.getElement());

    for (const point of this.points) {
      render(new EventItemView({ point }), this.tripListComponent.getElement());
    }
  }
}
