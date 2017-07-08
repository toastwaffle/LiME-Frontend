import {createConstants} from '../utils';

export const AppActions = createConstants(
  'ADD_MESSAGE',
  'CLEAR_MESSAGE',
  'LOGOUT'
);

export const AppActionCreators = {
  addMessageFromRequestError: function(error) {
    var message = error.message;
    if (error.statusCode !== null) {
      message = error.statusCode + ' - ' + message;
    }
    if (error.response.error !== undefined) {
      message += ': ' + error.response.error;
    }
    return AppActionCreators.addMessage('error', message);
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
