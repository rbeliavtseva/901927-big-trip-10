const menuItems = [
  `Table`,
  `Stats`
];

const generateMenuItems = () => {
  return menuItems.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateMenuItems};
