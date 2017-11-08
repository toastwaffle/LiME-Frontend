import {ChildrenLoadedActions} from '../actions/childrenLoaded';
import {createReducer, filterObject} from '../utils';

const initialState = {};

export default createReducer(initialState, true, {
  [ChildrenLoadedActions.LOADED]: (state, payload) => {
    return Object.assign({}, state, {[payload.parent_id]: true});
  },
  [ChildrenLoadedActions.DELETE]: (state, payload) => {
    return filterObject(state, ...payload.parent_ids);
  },
});
