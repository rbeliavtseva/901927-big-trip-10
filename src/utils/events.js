import {EventTypes} from '../mock/event.js';

/**
 * Функция возвращает артикль в зависимости от типа события
 * @param {string} eventType Тип события
 * @return {string} возвращает артикль
 */
const checkEventTypeArticle = (eventType) => {
  if (EventTypes.Transport.includes(eventType)) {
    return `to`;
  } else if (EventTypes.Activity.includes(eventType)) {
    return `at`;
  } else {
    return null;
  }
};

/**
 * Функция преобразует первую букву слова в заглавную
 * @param {string} word Слово
 * @return {string} Возвращает строку
 */
const toUppercaseFirstLetter = (word) => {
  return String(word.slice(0, 1)).toUpperCase() + word.slice(1, word.length);
};

export {checkEventTypeArticle, toUppercaseFirstLetter};
