import {AuthActions} from '../actions/auth';
import {createReducer} from '../utils';
import Backend from '../utils/Backend';

const unauthenticatedBackend = new Backend(null);

const initialState = {
  backend: unauthenticatedBackend,
  isAuthenticating: false
};

export default createReducer(initialState, {
  [AuthActions.LOGIN_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true
    });
  },
  [AuthActions.LOGIN_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': new Backend(payload.token)
    });
  },
  [AuthActions.REGISTER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true
    });
  },
  [AuthActions.REGISTER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': new Backend(payload.token)
    });
  },
  [AuthActions.AUTH_FAILURE]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': false
    });
  },
  [AuthActions.LOGOUT]: (state) => {
    return Object.assign({}, state, {
      'backend': unauthenticatedBackend
    });
  }
});
