import {createConstants} from '../utils';

export const AuthActions = createConstants(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_FAILURE',
  'LOGIN_USER_SUCCESS',
  'LOGOUT_USER'
);
