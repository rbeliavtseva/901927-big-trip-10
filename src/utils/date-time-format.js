import {MS, TIME} from '../consts.js';

/**
 * Функция преобразования чисел меньше 10 в формат `0x`
 * @param {number} number Любое число
 * @return {*} Возвращает строку или число
 */
const pad = (number) => {
  if (number < 10) {
    return `0` + number;
  }
  return number;
};

/**
 * Функция преобразования времени в формат `00:00`
 * @param {object} date Дата
 * @return {string} Возвращает строку
 */
const formatTime = (date) => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${hours}:${minutes}`;
};

/**
 * Функция преобразования даты в формат `00D/00M/00Y 00:00`
 * @param {object} date Дата
 * @return {string} Возвращает строку
 */
const toEventDateFormat = (date) => {
  return pad(date.getDate()) +
        `/` + pad(date.getMonth() + 1) +
        `/` + date.getFullYear().toString().slice(2, 4) +
        ` ` + pad(date.getHours()) +
        `:` + pad(date.getMinutes());
};

/**
 * Функция преобразования даты в формат `MON 00D — 00D`
 * @param {object} dateStart Дата начала события
 * @param {object} dateEnd Дата конца события
 * @return {string} Возвращает строку
 */
const toTripInfoDateFormat = (dateStart, dateEnd) => {
  return toShortDateTimeFormat(dateStart) +
        `&nbsp;&mdash;&nbsp;` + pad(dateEnd.getDate());
};

/**
 * Функция преобразует дату в формат `MON 00D`
 * @param {object} dateStart Дата
 * @return {string} Возвращает строку
 */
const toShortDateTimeFormat = (dateStart) => {
  return dateStart.toLocaleString(`en-US`, {month: `short`}) +
        ` ` + pad(dateStart.getDate());
};

/**
 * Функция прибавляет заданное количество дней к дате и форматирует её
 * @param {object} date Дата
 * @param {number} daysCount Количество дней
 * @return {string} Возвращает строку
 */
const addDaysToDate = (date, daysCount) => {
  return new Date(date.getFullYear().toString().slice(2, 4), date.getMonth(), date.getDate() + daysCount);
};

/**
 * Функция возвращает разницу между началом события и его концом в формате `00H 00M`
 * @param {object} dateStart Дата начала события
 * @param {object} dateEnd Дата конца события
 * @return {string} Возвращает строку
 */
const toCardTimePassedFormat = (dateStart, dateEnd) => {
  const diffTime = Math.abs(dateStart - dateEnd);
  const workTime = diffTime / (MS * TIME);
  const hours = Math.floor(workTime / TIME);
  const minutes = Math.floor((workTime % TIME));
  return `${hours}H ${minutes}M`;
};

export {formatTime, toEventDateFormat, toTripInfoDateFormat, toCardTimePassedFormat, toShortDateTimeFormat, addDaysToDate};
