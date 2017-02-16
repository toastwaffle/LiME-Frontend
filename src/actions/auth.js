import {createConstants} from '../utils';

export const AuthActions = createConstants(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_FAILURE',
  'LOGIN_USER_SUCCESS',
  'LOGOUT_USER'
);

export const AuthActionCreators = {
  loginUser: function(email, password, redirect="/") {
    console.log(email);
    return {
      type: AuthActions.LOGIN_USER_FAILURE,
      payload: {
        status: ":(",
        statusText: "I haven't implemented this bit yet!"
      }
    }
  },
}
