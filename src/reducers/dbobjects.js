import {DbObjectActions} from '../actions/dbobjects';
import {createReducer, filterObject} from '../utils';

const initialState = {};

export default function dbObjectReducer(object_type) {
  return createReducer(initialState, true, {
    [DbObjectActions.LOAD]: (state, payload) => {
      if (payload.object_type !== object_type) return state;
      if (payload.objects.length === 0) return state;

      return Object.assign(
        {}, state, payload.objects.reduce((acc, val) => {
          acc[val.object_id] = val;
          return acc;
        }, {}));
    },
    [DbObjectActions.DELETE]: (state, payload) => {
      if (payload.object_type !== object_type) return state;

      return filterObject(state, ...payload.object_ids);
    },
  });
}
