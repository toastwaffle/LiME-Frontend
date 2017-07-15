import {MessageActions} from '../actions/messages';
import {createReducer,createUuid4} from '../utils';

const initialState = [];

export default createReducer(initialState, {
  [MessageActions.ADD_MESSAGE]: (state, payload) => {
    return state.concat([{
      id: createUuid4(),
      level: payload.level,
      message: payload.message
    }]);
  },
  [MessageActions.CLEAR_MESSAGE]: (state, payload) => {
    return state.filter(message => message.id !== payload.id);
  },
  [MessageActions.LOGOUT]: () => {
    return initialState;
  }
});
