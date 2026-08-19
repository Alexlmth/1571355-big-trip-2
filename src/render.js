const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
//  функция createElement(template) создает новый элемент DOM на основе переданного шаблона HTML.
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  //  возвращает первый дочерний элемент нового элемента, который является корневым элементом шаблона.
  return newElement.firstElementChild;
}

//  функция render(component, container, place) отображает компонент на странице внутри указанного контейнера.
function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

export {RenderPosition, createElement, render};
