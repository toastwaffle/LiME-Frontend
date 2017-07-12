import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import messages from './messages';
import modals from './modals';
import settings from './settings';
import tasks from './tasks';

export default combineReducers({
  auth,
  messages,
  modals,
  routing: routerReducer,
  settings,
  tasks,
});
