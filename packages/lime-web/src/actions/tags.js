import {DbObjectActionCreators} from './dbobjects';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const TagActionCreators = {
  getTagsAndGroups: function() {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_tags_and_groups', {},
        function(response) {
          dispatch(DbObjectActionCreators.load(response));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  addTagGroup: function(title, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_tag_group', {title},
        function(groups) {
          dispatch(
            DbObjectActionCreators.load(groups));
          clearForm();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  addTag: function(title, group_id, clearForm) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'add_tag', {title, group_id},
        function(mutated) {
          dispatch(
            DbObjectActionCreators.load(mutated));
          clearForm();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  applyTagToTasks: function(tag_id, task_ids, hideMenu) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'apply_tag_to_tasks', {tag_id, task_ids},
        function(mutated) {
          dispatch(
            DbObjectActionCreators.load(mutated));
          hideMenu();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  removeTagFromTasks: function(tag_id, task_ids) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'remove_tag_from_tasks', {tag_id, task_ids},
        function(mutated) {
          dispatch(DbObjectActionCreators.load(mutated));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  deleteTagGroup: function(tag_group) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_tag_group', {group_id: tag_group.object_id},
        function() {
          dispatch(DbObjectActionCreators.delete(
            'TagGroup', [tag_group.object_id]));
          dispatch(DbObjectActionCreators.filter(
            'Tag', (tag) => tag.group_id !== tag_group.object_id));
          let group_tag_ids = new Set(tag_group.tag_ids);
          dispatch(DbObjectActionCreators.map(
            'Task', (task) => {
              let new_tag_ids = task.tag_ids.filter(id => !group_tag_ids.has(id));
              if (new_tag_ids.length === task.tag_ids.length) return task;
              return Object.assign({}, task, {tag_ids: new_tag_ids});
            }));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  deleteTag: function(tag_id) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'delete_tag', {tag_id},
        function() {
          dispatch(DbObjectActionCreators.delete(
            'Tag', [tag_id]));
          dispatch(DbObjectActionCreators.map(
            'Task', (task) => {
              if (!task.tag_ids.includes(tag_id)) return task;
              return Object.assign(
                {}, task, {tag_ids: task.tag_ids.filter(id => id !== tag_id)});
            }));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
};
