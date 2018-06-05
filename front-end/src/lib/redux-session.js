export default store => next => (action) => {
  const result = next(action);
  const state = store.getState();

  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      localStorage[key] = JSON.stringify(state[key]);
    }
  }
  return result;
};
