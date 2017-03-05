import Backend from '../utils/Backend';
import {createReducer} from '../utils';
import {AuthActions} from '../actions/auth';

const unauthenticatedBackend = new Backend(null);

const initialState = {
  backend: unauthenticatedBackend,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [AuthActions.LOGIN_REQUEST]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
  },
  [AuthActions.LOGIN_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': new Backend(payload.token),
      'statusText': 'You have been successfully logged in.'
    });
  },
  [AuthActions.LOGIN_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'backend': unauthenticatedBackend,
      'statusText': `Authentication Error: ${payload.response.error}`
    });
  },
  [AuthActions.LOGOUT]: (state) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'backend': unauthenticatedBackend,
      'statusText': 'You have been successfully logged out.'
    });
  }
});
