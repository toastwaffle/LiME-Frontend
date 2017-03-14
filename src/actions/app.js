import {createConstants} from '../utils';

export const AppActions = createConstants(
  'ADD_MESSAGE',
  'CLEAR_MESSAGE',
  'LOGOUT'
);

export const AppActionCreators = {
  addMessageFromRequestError: function(error) {
    var message = error.statusCode + ' - ' + error.message;
    if (error.response.error !== undefined) {
      message += ': ' + error.response.error;
    }
    return {
      type: 'ADD_MESSAGE',
      payload: {
        level: 'error',
        message: message
      }
    };
  },
  addMessage: function(level, message) {
    return {
      type: 'ADD_MESSAGE',
      payload: {
        level: level,
        message: message
      }
    };
  },
  clearMessage: function(id) {
    return {
      type: 'CLEAR_MESSAGE',
      payload: {id: id}
    };
  }
};
