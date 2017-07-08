import {push} from 'react-router-redux';

import {MessageActions} from './messages';
import {TaskActions} from './tasks';
import {createConstants} from '../utils';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const AuthActions = createConstants(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'AUTH_FAILURE',
  'LOGOUT'
);

export const AuthActionCreators = {
  login: function(email, password, redirect='/') {
    return function(dispatch, getState) {
      dispatch(AuthActionCreators.loginRequest());
      return getState().auth.backend.requestNoAuth(
        'login', {email, password},
        function(token) {
          dispatch(AuthActionCreators.loginSuccess(token));
          dispatch(push(redirect));
        },
        defaultBackendErrorHandler(dispatch, AuthActionCreators.authFailure())
      );
    };
  },
  loginRequest: function() {
    return {type: AuthActions.LOGIN_REQUEST};
  },
  loginSuccess: function(token) {
    localStorage.setItem('token', JSON.stringify(token));
    return {
      type: AuthActions.LOGIN_SUCCESS,
      payload: {token}
    };
  },
  register: function(email, password, name, redirect='/') {
    return function(dispatch, getState) {
      dispatch(AuthActionCreators.registerRequest());
      return getState().auth.backend.requestNoAuth(
        'register', {email, password, name},
        function(token) {
          dispatch(AuthActionCreators.registerSuccess(token));
          dispatch(push(redirect));
        },
        defaultBackendErrorHandler(dispatch, AuthActionCreators.authFailure())
      );
    };
  },
  registerRequest: function() {
    return {type: AuthActions.REGISTER_REQUEST};
  },
  registerSuccess: function(token) {
    localStorage.setItem('token', JSON.stringify(token));
    return {
      type: AuthActions.REGISTER_SUCCESS,
      payload: {token}
    };
  },
  authFailure: function() {
    return {
      type: AuthActions.AUTH_FAILURE
    };
  },
  logout: function() {
    return function(dispatch) {
      localStorage.clear('token');
      dispatch({type: AuthActions.LOGOUT});
      dispatch({type: MessageActions.LOGOUT});
      dispatch({type: TaskActions.LOGOUT});
    };
  }
};
