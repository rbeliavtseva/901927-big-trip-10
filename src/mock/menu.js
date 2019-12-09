const MenuItems = [
  `Table`,
  `Stats`
];

const generateMenuItems = () => {
  return MenuItems.map((it) => {
    return {
      name: it,
    };
  });
};

export {generateMenuItems};
