import {AppActionCreators} from '../actions/app';
import {AuthActionCreators} from '../actions/auth';

export default function defaultBackendErrorHandler(dispatch) {
  return function(error) {
    dispatch(AppActionCreators.addMessageFromRequestError(error));
    if (error.statusCode === 401) {
      dispatch(AuthActionCreators.logout());
    }
  }
}
