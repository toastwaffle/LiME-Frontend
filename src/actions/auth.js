import {MessageActions} from './messages';
import {createConstants, logoutAction} from '../utils';
import {push} from 'react-router-redux';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const AuthActions = createConstants('AUTH_ACTION_', [
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'REGISTER_REQUEST',
  'REGISTER_SUCCESS',
  'FAILURE',
]);

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
      type: AuthActions.FAILURE
    };
  },
  logout: function() {
    return function(dispatch, getState) {
      localStorage.clear('token');

      // Common logout action which restores many state partitions to their
      // initial state.
      dispatch({type: logoutAction});

      if (getState().auth.backend.isAuthenticated()) {
        dispatch({type: MessageActions.LOGOUT});
      }
    };
  }
};
