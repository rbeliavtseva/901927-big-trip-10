const createMenuMarkup = (item, isActive) => {
  const {name} = item;

  return (
    `<a class="trip-tabs__btn
      trip-tabs__btn
      ${isActive ? `--active` : ``}"
      href="#">
        ${name}
      </a>`
  );
};

export const createMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((it, i) => createMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkup}
    </nav>`
  );
};
