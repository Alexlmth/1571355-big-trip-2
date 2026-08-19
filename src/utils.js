function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalize(value) {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

export { getRandomArrayElement, capitalize };
