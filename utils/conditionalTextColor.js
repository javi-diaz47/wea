const conditionalTextColor = (state, color) => {
  return `${state ? color : ""}`;
};

export { conditionalTextColor };
