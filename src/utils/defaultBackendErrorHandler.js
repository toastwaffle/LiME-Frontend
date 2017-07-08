import {AuthActionCreators} from '../actions/auth';
import {MessageActionCreators} from '../actions/messages';

export default function defaultBackendErrorHandler(dispatch, ...extraActions) {
  return function(error) {
    dispatch(MessageActionCreators.addMessageFromRequestError(error));
    if (error.statusCode === 401) {
      dispatch(AuthActionCreators.logout());
    }
    extraActions.map((action) => dispatch(action));
  };
}
