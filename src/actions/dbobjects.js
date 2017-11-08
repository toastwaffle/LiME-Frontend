import {createConstants} from '../utils';

export const DbObjectActions = createConstants('DB_OBJECT_ACTION_', [
  'LOAD',
  'DELETE',
]);

export const DbObjectTypes = createConstants('DB_OBJECT_TYPE_', [
  'TASK',
]);

export const DbObjectActionCreators = {
  load: function(object_type, objects) {
    return {
      type: DbObjectActions.LOAD,
      payload: {object_type, objects},
    };
  },
  delete: function(object_type, object_ids) {
    return {
      type: DbObjectActions.DELETE,
      payload: {object_type, object_ids},
    };
  },
};
