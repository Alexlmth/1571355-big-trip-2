import { render } from '../render.js';
import EventCreateView from '../view/event-create-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';

const EVENTS_COUNT = 3;

export default class TripPresenter {
  constructor({ filtersContainer, tripEventsContainer }) {
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new FilterView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer);

    this.renderEventsList();
  }

  renderEventsList() {
    const eventsListElement = document.createElement('ul');
    eventsListElement.classList.add('trip-events__list');

    this.tripEventsContainer.append(eventsListElement);

    this.renderEvent(eventsListElement, new EventEditView());
    this.renderEvent(eventsListElement, new EventCreateView());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      this.renderEvent(eventsListElement, new EventItemView());
    }
  }

  renderEvent(eventsListElement, eventComponent) {
    const eventItemElement = document.createElement('li');
    eventItemElement.classList.add('trip-events__item');
    eventsListElement.append(eventItemElement);

    render(eventComponent, eventItemElement);
  }
}
