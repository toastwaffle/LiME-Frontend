import {TaskActions} from '../actions/tasks';
import {createReducer, filterObject} from '../utils';

const initialState = {
  'byID': {},
  'childrenLoaded': {}
};

export default createReducer(initialState, {
  [TaskActions.GOT_TASKS]: (state, payload) => {
    if (payload.tasks.length === 0) return state;
    return Object.assign(
      {}, state, {
        'byID': Object.assign(
          {}, state.byID, payload.tasks.reduce((acc, val) => {
            acc[val.object_id] = val;
            return acc;
          }, {})),
      });
  },
  [TaskActions.CHILDREN_LOADED]: (state, payload) => {
    return Object.assign(
      {}, state, {
        'childrenLoaded': Object.assign(
          {}, state.childrenLoaded, {[payload.parent_id]: true})
      });
  },
  [TaskActions.TASK_DELETED]: (state, payload) => {
    var tasksToDelete = maybeCascadeDelete(state.byID, payload.task_id, payload.cascade);

    return Object.assign(
      {}, state, {
        'byID': filterObject(state.byID, ...tasksToDelete),
        'childrenLoaded': filterObject(state.childrenLoaded, ...tasksToDelete)
      });
  },
  [TaskActions.LOGOUT]: () => {
    return initialState;
  }
});

function maybeCascadeDelete(tasksByID, task_id, cascade) {
  var parents = new Set([task_id]);
  if (!cascade) return parents;
  function isChild(parentSet) {
    return task => parentSet.has(task.parent_id) || parentSet.has(task.object_id);
  }
  var taskToObject = task => task.object_id;
  var newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  while (newParents.size > parents.size) {
    parents = newParents;
    newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  }
  return newParents;
}
