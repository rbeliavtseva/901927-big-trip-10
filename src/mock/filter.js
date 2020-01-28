import {FilterNames} from '../consts.js';

const generateFilters = () => {
  return Object.values(FilterNames).map((it) => {
    return {
      name: it
    };
  });
};

export {generateFilters};
