import {TaskActions} from '../actions/tasks';
import {createReducer, filterObject} from '../utils';

const initialState = {
  'byID': {},
  'childrenLoaded': {}
};

export default createReducer(initialState, {
  [TaskActions.GOT_TASKS]: (state, payload) => {
    return Object.assign(
      {}, state, {
        'byID': Object.assign(
          {}, state.byID, payload.tasks.reduce((acc, val) => {
            acc[val.object_id] = val;
            return acc;
          }, {})),
        'childrenLoaded': Object.assign(
          {}, state.childrenLoaded, {[payload.parent_id]: true})
      });
  },
  [TaskActions.TASK_UPDATED]: (state, payload) => {
    return Object.assign(
      {}, state, {
        'byID': Object.assign(
          {}, state.byID, {[payload.task.object_id]: payload.task})
    });
  },
  [TaskActions.TASK_DELETED]: (state, payload) => {
    return Object.assign(
      {}, state, {
        'byID': filterObject(state.byID, payload.task_id),
        'childrenLoaded': filterObject(state.childrenLoaded, payload.task_id)
      });
  },
  [TaskActions.LOGOUT]: () => {
    return initialState;
  }
});
