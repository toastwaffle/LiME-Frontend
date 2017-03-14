import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './app';
import auth from './auth';
import tasks from './tasks';

export default combineReducers({
  app,
  auth,
  tasks,
  routing: routerReducer
});
