import {createReducer} from '../utils';
import {AuthActions} from '../actions/auth';

const initialState = {
  token: null,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [AuthActions.LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
  },
  [AuthActions.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'token': payload.token,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [AuthActions.LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'token': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [AuthActions.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'statusText': 'You have been successfully logged out.'
    });
  }
});
