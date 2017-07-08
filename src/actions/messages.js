import {createConstants} from '../utils';

export const MessageActions = createConstants(
  'ADD_MESSAGE',
  'CLEAR_MESSAGE',
  'LOGOUT'
);

export const MessageActionCreators = {
  addMessageFromRequestError: function(error) {
    var message = error.message;
    if (error.statusCode !== null) {
      message = error.statusCode + ' - ' + message;
    }
    if (error.response.error !== undefined) {
      message += ': ' + error.response.error;
    }
    return MessageActionCreators.addMessage('error', message);
  },
  addMessage: function(level, message) {
    return {
      type: MessageActions.ADD_MESSAGE,
      payload: {
        level: level,
        message: message
      }
    };
  },
  clearMessage: function(id) {
    return {
      type: MessageActions.CLEAR_MESSAGE,
      payload: {id: id}
    };
  }
};
