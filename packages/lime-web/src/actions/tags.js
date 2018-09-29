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
};
