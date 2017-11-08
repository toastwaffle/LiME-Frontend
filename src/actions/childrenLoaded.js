import {createConstants} from '../utils';

export const ChildrenLoadedActions = createConstants('CHILDREN_LOADED_ACTION_', [
  'LOADED',
  'DELETE',
]);

export const ChildrenLoadedActionCreators = {
  loaded: function(parent_id) {
    return {
      type: ChildrenLoadedActions.LOADED,
      payload: {parent_id},
    };
  },
  delete: function(parent_ids) {
    return {
      type: ChildrenLoadedActions.DELETE,
      payload: {parent_ids},
    };
  },
};
