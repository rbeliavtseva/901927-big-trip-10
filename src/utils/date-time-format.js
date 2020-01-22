import moment from 'moment';

/**
 * Функция преобразования чисел меньше 10 в формат `0x`
 * @param {number} number Любое число
 * @return {string} Возвращает строку
 */
const pad = (number) => {
  if (number < 10) {
    return `0` + number;
  }
  return number.toString();
};

/**
 * Функция преобразования времени в формат `00:00`
 * @param {object} date Дата
 * @return {string} Возвращает строку
 */
const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

/**
 * Функция преобразования даты в формат `MON 00D — 00D`
 * @param {object} dateStart Дата начала события
 * @param {object} dateEnd Дата конца события
 * @return {string} Возвращает строку
 */
const toTripInfoDateFormat = (dateStart, dateEnd) => {
  return `${moment(dateStart).format(`ddd DD`)}&nbsp;&mdash;&nbsp;${moment(dateEnd).format(`DD`)}`;
};

/**
 * Функция преобразует дату в формат `MON 00D`
 * @param {object} dateStart Дата
 * @return {string} Возвращает строку
 */
const toShortDateTimeFormat = (dateStart) => {
  return `${moment(dateStart).format(`ddd DD`)}`;
};

/**
 * Функция прибавляет заданное количество дней к дате и форматирует её
 * @param {object} date Дата
 * @param {number} daysCount Количество дней
 * @return {string} Возвращает строку
 */
const addDaysToDate = (date, daysCount) => {
  return moment(date).add(daysCount, `days`).toDate();
};

/**
 * Функция возвращает разницу между началом события и его концом в формате `00H 00M`
 * @param {object} dateStart Дата начала события
 * @param {object} dateEnd Дата конца события
 * @return {string} Возвращает строку
 */
const toCardTimePassedFormat = (dateStart, dateEnd) => {
  const dateA = moment(dateStart);
  const dateB = moment(dateEnd);
  const duration = moment.duration(dateB.diff(dateA));
  if (duration.days() > 0) {
    return `${pad(duration.days())}D ${pad(duration.hours())}H ${pad(duration.minutes())}M`;
  } else {
    if (duration.hours() >= 1) {
      return `${pad(duration.hours())}H ${pad(duration.minutes())}M`;
    } else {
      return `${pad(duration.minutes())}M`;
    }
  }
};

export {formatTime, toTripInfoDateFormat, toCardTimePassedFormat, toShortDateTimeFormat, addDaysToDate};
