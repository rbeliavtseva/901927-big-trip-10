import {MS, TIME} from '../consts.js';

const pad = (number) => {
  if (number < 10) {
    return `0` + number;
  }
  return number;
};

const formatTime = (date) => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${hours}:${minutes}`;
};

const toEventDateFormat = (date) => {
  return pad(date.getDate()) +
        `/` + pad(date.getMonth() + 1) +
        `/` + date.getFullYear().toString().slice(2, 4) +
        ` ` + pad(date.getHours()) +
        `:` + pad(date.getMinutes());
};

const toTripInfoDateFormat = (dateStart, dateEnd) => {
  return dateStart.toLocaleString(`en-US`, {month: `short`}) +
        ` ` + pad(dateStart.getDate()) +
        `&nbsp;&mdash;&nbsp;` + pad(dateEnd.getDate());
};

const toCardTimePassedFormat = (dateStart, dateEnd) => {
  const diffTime = Math.abs(dateStart - dateEnd);
  const workTime = diffTime / (MS * TIME);
  const hours = Math.floor(workTime / TIME);
  const minutes = Math.floor((workTime % TIME));
  return `${hours}H ${minutes}M`;
};

export {formatTime, toEventDateFormat, toTripInfoDateFormat, toCardTimePassedFormat};
