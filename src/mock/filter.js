const FilterNames = [
  `everything`,
  `future`,
  `past`
];

const generateFilters = () => {
  return FilterNames.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateFilters, FilterNames};
