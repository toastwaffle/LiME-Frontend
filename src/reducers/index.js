import {DbObjectTypes} from '../actions/dbobjects';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import childrenLoaded from './childrenLoaded';
import dbObjectReducer from './dbobjects';
import messages from './messages';
import modals from './modals';
import settings from './settings';

export default combineReducers({
  auth,
  childrenLoaded,
  messages,
  modals,
  routing: routerReducer,
  settings,
  tasks: dbObjectReducer(DbObjectTypes.TASK),
});
