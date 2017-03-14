import {AppActionCreators} from './app';
import {createConstants} from '../utils';

export const TaskActions = createConstants(
  'GOT_TASKS',
  'TASK_ADDED',
  'TASK_DELETED',
  'LOGOUT'
);

export const TaskActionCreators = {
  getTasks: function() {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tasks', {},
        function(tasks) {
          dispatch(TaskActionCreators.gotTasks(tasks));
        },
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
    };
  },
  gotTasks: function(tasks) {
    return {
      type: TaskActions.GOT_TASKS,
      payload: {tasks: tasks}
    };
  },
  addTask: function(title) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_task', {title: title},
        function(task) {
          dispatch(TaskActionCreators.taskAdded(task));
        },
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
    };
  },
  taskAdded: function(task) {
    return {
      type: TaskActions.TASK_ADDED,
      payload: {task: task}
    };
  },
  deleteTask: function(task) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_task', {task_id: task.data.object_id},
        function() {
          dispatch(TaskActionCreators.taskDeleted(task));
        },
        function(error) {
          dispatch(AppActionCreators.addMessageFromRequestError(error));
        });
    };
  },
  taskDeleted: function(task) {
    return {
      type: TaskActions.TASK_DELETED,
      payload: {task: task}
    };
  }
};
