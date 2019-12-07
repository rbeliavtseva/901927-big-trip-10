const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const pad = (number) => {
  if (number < 10) {
    return `0` + number;
  }
  return number;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const toISOstring = (date) => {
  return date.getFullYear() +
        `-` + pad(date.getMonth() + 1) +
        `-` + pad(date.getDate()) +
        `T` + pad(date.getHours()) +
        `:` + pad(date.getMinutes());
};

export const toEventDateFormat = (date) => {
  return pad(date.getDate()) +
        `/` + pad(date.getMonth() + 1) +
        `/` + date.getFullYear().toString().slice(2, 4) +
        ` ` + pad(date.getHours()) +
        `:` + pad(date.getMinutes());
};

export const toTripInfoDateFormat = (dateStart, dateEnd) => {
  return dateStart.toLocaleString(`en-US`, {month: `short`}) +
        ` ` + pad(dateStart.getDate()) +
        `&nbsp;&mdash;&nbsp;` + pad(dateEnd.getDate());
};

export const toCardTimePassedFormat = (dateStart, dateEnd) => {
  const diffTime = Math.abs(dateStart - dateEnd);
  const workTime = diffTime / (1000 * 60);
  const hours = Math.floor(workTime / 60);
  const minutes = Math.floor((workTime % 60));
  return `${hours}H ${minutes}M`;
};
