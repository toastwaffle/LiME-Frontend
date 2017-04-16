import {createConstants} from '../utils';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const TaskActions = createConstants(
  'GOT_TASKS',
  'TASK_UPDATED',
  'TASK_DELETED',
  'LOGOUT'
);

export const TaskActionCreators = {
  getTasks: function(parent_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tasks', {parent_id: parent_id},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(parent_id, tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  gotTasks: function(parent_id, tasks) {
    return {
      type: TaskActions.GOT_TASKS,
      payload: {parent_id: parent_id, tasks: tasks}
    };
  },
  addTask: function(parent_id, title, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_task', {parent_id: parent_id, title: title},
        function(task) {
          dispatch(TaskActionCreators.taskUpdated(task));
          clearForm();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  deleteTask: function(task) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_task', {task_id: task.object_id},
        function() {
          dispatch(TaskActionCreators.taskDeleted(task.object_id));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  taskDeleted: function(task_id) {
    return {
      type: TaskActions.TASK_DELETED,
      payload: {task_id: task_id}
    };
  },
  setTaskCompletedState: function(task_id, completed) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'set_completed_state', {task_id: task_id, completed: completed},
        function(task) {
          dispatch(TaskActionCreators.taskUpdated(task));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  taskUpdated: function(task) {
    return {
      type: TaskActions.TASK_UPDATED,
      payload: {task: task}
    };
  }
};
