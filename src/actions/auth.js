import {push} from 'react-router-redux';

import {createConstants} from '../utils';

export const AuthActions = createConstants(
  'LOGIN_FAILURE',
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'REGISTER_FAILURE',
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
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
  },
  register: function(email, password, name, redirect='/') {
    return function(dispatch, getState) {
      dispatch(AuthActionCreators.registerRequest());
      return getState().auth.backend.requestNoAuth(
        'register', {email: email, password: password, name: name},
        function(token) {
          dispatch(AuthActionCreators.registerSuccess(token));
          dispatch(push(redirect));
        },
        function(error) {
          dispatch(AuthActionCreators.registerFailure(error));
        });
    };
  },
  registerRequest: function() {
    return {type: AuthActions.REGISTER_REQUEST};
  },
  registerSuccess: function(token) {
    localStorage.setItem('token', token);
    return {
      type: AuthActions.REGISTER_SUCCESS,
      payload: {token: token}
    };
  },
  registerFailure: function(error) {
    localStorage.removeItem('token');
    return {
      type: AuthActions.REGISTER_FAILURE,
      payload: {response: error.response}
    };
  },
  logout: function() {
    return {type: AuthActions.LOGOUT};
  }
};
