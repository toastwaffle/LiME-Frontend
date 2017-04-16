import {AppActionCreators} from './app';
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
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
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
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
    };
  },
  deleteTask: function(task) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_task', {task_id: task.object_id},
        function() {
          dispatch(TaskActionCreators.taskDeleted(task.object_id));
        },
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
    };
  },
  taskDeleted: function(task_id) {
    return {
      type: TaskActions.TASK_DELETED,
      payload: {task_id: task_id}
    };
  },
  taskUpdated: function(task) {
    return {
      type: TaskActions.TASK_UPDATED,
      payload: {task: task}
    };
  }
};
