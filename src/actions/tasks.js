import {createConstants} from '../utils';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const TaskActions = createConstants(
  'GOT_TASKS',
  'TASK_UPDATED',
  'TASK_DELETED',
  'CHILD_MODIFIED',
  'LOGOUT'
);

export const TaskActionCreators = {
  getTasks: function(parent_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tasks', {parent_id},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(parent_id, tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  gotTasks: function(parent_id, tasks) {
    return {
      type: TaskActions.GOT_TASKS,
      payload: {parent_id, tasks}
    };
  },
  getTask: function(task_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_task', {task_id},
        function(task) {
          dispatch(TaskActionCreators.taskUpdated(task));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  addTask: function(parent_id, title, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_task', {parent_id, title},
        function(task) {
          dispatch(TaskActionCreators.taskUpdated(task));
          dispatch(TaskActionCreators.childModified(parent_id));
          clearForm();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  deleteTask: function(task, cascade=false) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_task', {task_id: task.object_id, cascade},
        function() {
          dispatch(TaskActionCreators.taskDeleted(task.object_id, cascade));
          dispatch(TaskActionCreators.childModified(task.parent_id));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  taskDeleted: function(task_id, cascade) {
    return {
      type: TaskActions.TASK_DELETED,
      payload: {task_id, cascade}
    };
  },
  setTaskCompletedState: function(task_id, completed) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'set_completed_state', {task_id, completed},
        function(task) {
          dispatch(TaskActionCreators.taskUpdated(task));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  taskUpdated: function(task) {
    return {
      type: TaskActions.TASK_UPDATED,
      payload: {task}
    };
  },
  childModified: function(parent_id) {
    return {
      type: TaskActions.CHILD_MODIFIED,
      payload: {parent_id}
    };
  }
};
