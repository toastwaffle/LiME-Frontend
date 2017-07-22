import {createConstants} from '../utils';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const TaskActions = createConstants('TASK_ACTION_', [
  'GOT_TASKS',
  'CHILDREN_LOADED',
  'TASK_DELETED',
  'LOGOUT'
]);

export const TaskActionCreators = {
  getTasks: function(parent_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tasks', {parent_id},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(tasks));
          dispatch(TaskActionCreators.childrenLoaded(parent_id));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  getTask: function(task_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_task', {task_id},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  addTask: function(parent_id, title, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_task', {parent_id, title},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(tasks));
          clearForm();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  deleteTask: function(task, cascade=false) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_task', {task_id: task.object_id, cascade},
        function(tasks) {
          dispatch(TaskActionCreators.taskDeleted(task.object_id, cascade));
          dispatch(TaskActionCreators.gotTasks(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  setTaskCompletedState: function(task_id, completed) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'set_completed_state', {task_id, completed},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  gotTasks: function(tasks) {
    return {
      type: TaskActions.GOT_TASKS,
      payload: {tasks}
    };
  },
  childrenLoaded: function(parent_id) {
    return {
      type: TaskActions.CHILDREN_LOADED,
      payload: {parent_id}
    };
  },
  taskDeleted: function(task_id, cascade) {
    return {
      type: TaskActions.TASK_DELETED,
      payload: {task_id, cascade}
    };
  }
};
