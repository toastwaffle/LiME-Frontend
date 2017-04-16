import {AppActions} from '../actions/app';
import {createReducer,createUuid4} from '../utils';

const initialState = {
  'messages': []
};

export default createReducer(initialState, {
  [AppActions.ADD_MESSAGE]: (state, payload) => {
    return Object.assign({}, state, {
      'messages': state.messages.concat([{
        id: createUuid4(),
        level: payload.level,
        message: payload.message
      }])
    });
  },
  [AppActions.CLEAR_MESSAGE]: (state, payload) => {
    return Object.assign({}, state, {
      'messages': state.messages.filter(message => message.id !== payload.id)
    });
  },
  [AppActions.LOGOUT]: () => {
    return initialState;
  }
});
