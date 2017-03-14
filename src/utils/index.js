export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createUuid4() {
  var fourHexits =
      () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return (
    fourHexits() + fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + fourHexits() + fourHexits()
  );
}
