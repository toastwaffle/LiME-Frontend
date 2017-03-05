import {push} from 'react-router-redux';

import {createConstants} from '../utils';

export const AuthActions = createConstants(
  'LOGIN_FAILURE',
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGOUT'
);

export const AuthActionCreators = {
  login: function(email, password, redirect='/') {
    return function(dispatch, getState) {
      dispatch(AuthActionCreators.loginRequest());
      return getState().auth.backend.requestNoAuth(
        'login', {email: email, password: password},
        function(token) {
          dispatch(AuthActionCreators.loginSuccess(token));
          dispatch(push(redirect));
        },
        function(error) {
          dispatch(AuthActionCreators.loginFailure(error));
        });
    };
  },
  loginRequest: function() {
    return {type: AuthActions.LOGIN_REQUEST};
  },
  loginSuccess: function(token) {
    localStorage.setItem('token', token);
    return {
      type: AuthActions.LOGIN_SUCCESS,
      payload: {token: token}
    };
  },
  loginFailure: function(error) {
    localStorage.removeItem('token');
    return {
      type: AuthActions.LOGIN_FAILURE,
      payload: {response: error.response}
    };
  }
};
