import { render, replace } from '../framework/render.js';
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
    this.pointComponents = [];
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

    for (const point of this.points) {
      let eventItemComponent = null;
      let eventEditComponent = null;
      let replaceFormToCard = null;

      const escKeyDownHandler = (evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          replaceFormToCard();
        }
      };

      replaceFormToCard = () => {
        replace(eventItemComponent, eventEditComponent);
        document.removeEventListener('keydown', escKeyDownHandler);
      };

      const replaceCardToForm = () => {
        replace(eventEditComponent, eventItemComponent);
        document.addEventListener('keydown', escKeyDownHandler);
      };

      eventItemComponent = new EventItemView({
        point,
        onEditClick: replaceCardToForm,
      });
      eventEditComponent = new EventEditView({
        point,
        destinations: this.destinations,
        offers: this.offers,
        onFormSubmit: replaceFormToCard,
        onRollupClick: replaceFormToCard,
      });

      this.pointComponents.push({
        eventItemComponent,
        eventEditComponent,
      });

      render(eventItemComponent, this.tripListComponent.element);
    }
  }
}
