import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './app';
import auth from './auth';
import modals from './modals';
import settings from './settings';
import tasks from './tasks';

export default combineReducers({
  app,
  auth,
  modals,
  settings,
  tasks,
  routing: routerReducer
});
