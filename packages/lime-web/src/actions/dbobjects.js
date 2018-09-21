import {createConstants} from '../utils';

export const DbObjectActions = createConstants('DB_OBJECT_ACTION_', [
  'LOAD',
  'DELETE',
]);

export const DbObjectActionCreators = {
  load: function(objects) {
    return {
      type: DbObjectActions.LOAD,
      payload: {objects},
    };
  },
  delete: function(identifier, object_ids) {
    return {
      type: DbObjectActions.DELETE,
      payload: {identifier, object_ids},
    };
  },
};
