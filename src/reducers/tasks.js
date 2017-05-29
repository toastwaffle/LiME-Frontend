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
    if (payload.cascade) {
      var tasksToDelete = cascadeDelete(state.byID, payload.task_id);
      return Object.assign(
        {}, state, {
          'byID': filterObject(state.byID, ...tasksToDelete),
          'childrenLoaded': filterObject(state.childrenLoaded, ...tasksToDelete)
        });
    } else {
      return Object.assign(
        {}, state, {
          'byID': deleteAndReparent(state.byID, payload.task_id),
          'childrenLoaded': filterObject(state.childrenLoaded, payload.task_id)
        });
    }
  },
  [TaskActions.CHILD_MODIFIED]: (state, payload) => {
    if (payload.parent_id === null) {
      return state
    }
    var hasChildren = Object.values(state.byID).filter(
      task => task.parent_id === payload.parent_id
    ).length > 0
    if (state.byID[payload.parent_id].has_children === hasChildren) {
      return state
    }
    return Object.assign(
      {}, state, {
        'byID': Object.assign(
          {}, state.byID, {
            [payload.parent_id]: Object.assign(
              {}, state.byID[payload.parent_id], {'has_children': hasChildren})
          })
      });
  },
  [TaskActions.LOGOUT]: () => {
    return initialState;
  }
});

function cascadeDelete(tasksByID, task_id) {
  function isChild(parentSet) {
    return task => parentSet.has(task.parent_id) || parentSet.has(task.object_id);
  }
  var taskToObject = task => task.object_id;
  var parents = new Set([task_id]);
  var newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  while (newParents.size > parents.size) {
    parents = newParents;
    newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  }
  return newParents;
}

function deleteAndReparent(tasksByID, task_id) {
  var newParent = tasksByID[task_id].parent_id;
  return Object.assign(
    filterObject(tasksByID, task_id),
    Object.values(tasksByID).reduce(
      function(acc, task) {
        if (task.parent_id === task_id) {
          acc[task.object_id] = Object.assign({}, task, {parent_id: newParent});
        }
        return acc;
      }, {}));
}
