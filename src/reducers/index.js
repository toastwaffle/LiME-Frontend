import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import app from './app';
import auth from './auth';

export default combineReducers({
  app,
  auth,
  routing: routerReducer
});
