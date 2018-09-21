import {DbObjectActions} from '../actions/dbobjects';
import {createReducer, filterObject} from '../utils';

const initialState = {};

export default function dbObjectReducer(identifier) {
  return createReducer(initialState, true, {
    [DbObjectActions.LOAD]: (state, payload) => {
      var objects = payload.objects.filter(
        (object) => object.__identifier === identifier);
      if (objects.length === 0) return state;

      return Object.assign(
        {}, state, objects.reduce((acc, val) => {
          acc[val.object_id] = val;
          return acc;
        }, {}));
    },
    [DbObjectActions.DELETE]: (state, payload) => {
      if (payload.identifier !== identifier) return state;

      return filterObject(state, ...payload.object_ids);
    },
  });
}
