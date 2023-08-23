const gettingCoinMiddleware = (store) => (next) => (action) => {
  console.log("Action", action);
  const result = next(action);
  console.log("State", store.getState());
  return result;
};

export { gettingCoinMiddleware };
