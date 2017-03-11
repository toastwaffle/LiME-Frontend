import Backend from '../utils/Backend';
import {createReducer} from '../utils';
import {AuthActions} from '../actions/auth';

const unauthenticatedBackend = new Backend(null);

const initialState = {
  backend: unauthenticatedBackend,
  isAuthenticating: false,
  loginStatusText: null,
  registerStatusText: null
};

export default createReducer(initialState, {
  [AuthActions.LOGIN_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'loginStatusText': null
    });
  },
  [AuthActions.LOGIN_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': new Backend(payload.token)
    });
  },
  [AuthActions.LOGIN_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'loginStatusText': `Authentication Error: ${payload.response.error}`
    });
  },
  [AuthActions.REGISTER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'registerStatusText': null
    });
  },
  [AuthActions.REGISTER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': new Backend(payload.token)
    });
  },
  [AuthActions.REGISTER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'registerStatusText': `Registration Error: ${payload.response.error}`
    });
  },
  [AuthActions.LOGOUT]: (state) => {
    return Object.assign({}, state, {
      'backend': unauthenticatedBackend
    });
  }
});
