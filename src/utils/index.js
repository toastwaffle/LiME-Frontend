export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function createConstants(prefix, constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = prefix + constant;
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

export function filterObject(obj, ...keysToRemove) {
  var copy = Object.assign({}, obj);
  for (var i = keysToRemove.length - 1; i >= 0; i--) {
    delete copy[keysToRemove[i]];
  }
  return copy;
}

export function formatStr(str, args) {
  for (var key in args) {
    str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
  }
  return str;
}

export function toggleState(key) {
  return function() {
    this.setState((prevState) => {
      return {[key]: !prevState[key]};
    });
  };
}
