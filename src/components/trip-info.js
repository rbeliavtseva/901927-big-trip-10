import {toTripInfoDateFormat} from '../util.js';

export const createTripTemplate = (eventData) => {
  const {date, cities} = eventData;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${cities.join(` &mdash; `)}</h1>

      <p class="trip-info__dates">${toTripInfoDateFormat(date.startDate, date.endDate)}</p>
    </div>`
  );
};
