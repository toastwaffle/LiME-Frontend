import {createConstants} from '../utils';

export const DbObjectActions = createConstants('DB_OBJECT_ACTION_', [
  'DELETE',
  'FILTER',
  'LOAD',
  'MAP',
]);

export const DbObjectActionCreators = {
  delete: function(identifier, object_ids) {
    return {
      type: DbObjectActions.DELETE,
      payload: {identifier, object_ids},
    };
  },
  filter: function(identifier, func) {
    return {
      type: DbObjectActions.FILTER,
      payload: {identifier, func},
    };
  },
  load: function(objects) {
    return {
      type: DbObjectActions.LOAD,
      payload: {objects},
    };
  },
  map: function(identifier, func) {
    return {
      type: DbObjectActions.MAP,
      payload: {identifier, func},
    };
  },
};
