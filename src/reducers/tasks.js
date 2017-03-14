import {TaskActions} from '../actions/tasks';
import {createReducer} from '../utils';

const initialState = {
  'taskIDs': undefined,
  'tasksByID': {}
};

export default createReducer(initialState, {
  [TaskActions.GOT_TASKS]: (state, payload) => {
    var tasksByID = {};
    payload.tasks.forEach(task => {tasksByID[task.object_id] = task;});
    return Object.assign({}, state, {
      'taskIDs': payload.tasks.map(task => task.object_id),
      'tasksByID': Object.assign({}, state.tasksByID, tasksByID)
    });
  },
  [TaskActions.TASK_ADDED]: (state, payload) => {
    return Object.assign({}, state, {
      'taskIDs': state.taskIDs.concat([payload.task.object_id]),
      'tasksByID': Object.assign({}, state.tasksByID, {
        [payload.task.object_id]: payload.task
      })
    });
  },
  [TaskActions.TASK_DELETED]: (state, payload) => {
    return Object.assign({}, state, {
      'taskIDs': state.taskIDs.filter(
        task => task.object_id !== payload.task.object_id),
      'tasksByID': state.tasksByID.values().reduce((acc, val) => {
        if (val.object_id !== payload.task.object_id) {
          acc[val.object_id] = val;
        }
        return acc;
      }, {})
    });
  },
  [TaskActions.LOGOUT]: (state, payload) => {
    return initialState;
  }
});
