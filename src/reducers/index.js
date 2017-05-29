import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './app';
import auth from './auth';
import modals from './modals';
import tasks from './tasks';

export default combineReducers({
  app,
  auth,
  modals,
  tasks,
  routing: routerReducer
});
