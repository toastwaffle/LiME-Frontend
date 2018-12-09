import {DbObjectActions} from '../actions/dbobjects';
import {createReducer, filterObject, objectArrayToObject} from '../utils';

const initialState = {};

export default function dbObjectReducer(identifier) {
  return createReducer(initialState, true, {
    [DbObjectActions.DELETE]: (state, payload) => {
      if (payload.identifier !== identifier) return state;

      return filterObject(state, ...payload.object_ids);
    },
    [DbObjectActions.FILTER]: (state, payload) => {
      if (payload.identifier !== identifier) return state;

      return Object.assign(
        {}, objectArrayToObject(Object.values(state).filter(payload.func)));
    },
    [DbObjectActions.LOAD]: (state, payload) => {
      var objects = payload.objects.filter(
        (object) => object.__identifier === identifier);
      if (objects.length === 0) return state;

      return Object.assign({}, state, objectArrayToObject(objects));
    },
    [DbObjectActions.MAP]: (state, payload) => {
      if (payload.identifier !== identifier) return state;

      return Object.assign(
        {}, objectArrayToObject(Object.values(state).map(payload.func)));
    },
  });
}
