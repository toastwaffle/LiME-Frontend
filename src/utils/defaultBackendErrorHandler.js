import {AppActionCreators} from '../actions/app';
import {AuthActionCreators} from '../actions/auth';

export default function defaultBackendErrorHandler(dispatch, ...extraActions) {
  return function(error) {
    dispatch(AppActionCreators.addMessageFromRequestError(error));
    if (error.statusCode === 401) {
      dispatch(AuthActionCreators.logout());
    }
    extraActions.map((action) => dispatch(action));
  };
}
