import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';

import {loginUserSuccess} from '../actions/auth';
import App from '../components/App';
import Layout from '../components/Layout';
import HomePage from '../components/HomePage';
import reducers from '../reducers';
import requireAuth from '../utils/requireAuth';

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore(
      reducers,
      applyMiddleware(routerMiddleware(browserHistory))
    );
    this.history = syncHistoryWithStore(browserHistory, this.store)

    let token = localStorage.getItem('token');
    if (token !== null) {
      this.store.dispatch(loginUserSuccess(token));
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={this.history}>
          <Route path='/' component={Layout}>
            <IndexRoute component={requireAuth(App)}/>
            <Route path="home" component={HomePage}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
