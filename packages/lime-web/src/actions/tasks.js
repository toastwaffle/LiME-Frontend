import {ChildrenLoadedActionCreators} from './childrenLoaded';
import {DbObjectActionCreators} from './dbobjects';
import {maybeCascadeDelete} from '../utils/tasks';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const TaskActionCreators = {
  getTasks: function(parent_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tasks', {parent_id},
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
          dispatch(ChildrenLoadedActionCreators.loaded(parent_id));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  getTask: function(task_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_task', {task_id},
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  addTask: function(parent_id, title, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_task', {parent_id, title},
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
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
          var tasksToDelete = maybeCascadeDelete(getState().tasks, task.object_id, cascade);

          dispatch(DbObjectActionCreators.delete('Task', tasksToDelete));
          dispatch(ChildrenLoadedActionCreators.delete(tasksToDelete));
          dispatch(DbObjectActionCreators.load(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  updateTask: function(task_id, fields, markSaved) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'update_task', Object.assign({task_id}, fields),
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
          if (typeof(markSaved) === 'function') {
            markSaved();
          }
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  reorderTask: function(task_id, after_id=null, before_id=null) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'reorder_task', {task_id, after_id, before_id},
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  reparentTask: function(task_id, parent_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'reparent_task', {task_id, parent_id},
        function(tasks) {
          dispatch(DbObjectActionCreators.load(tasks));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
};
