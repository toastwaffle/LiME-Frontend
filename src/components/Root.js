import {AuthActionCreators} from '../actions/auth';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import HomePage from './HomePage';
import Layout from './Layout';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import reducers from '../reducers';
import requireAuth from '../utils/requireAuth';
import thunk from 'redux-thunk';

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.history = createHistory();
    this.store = createStore(
      reducers,
      composeWithDevTools(applyMiddleware(thunk, routerMiddleware(this.history)))
    );

    let token = localStorage.getItem('token');
    if (token !== null) {
      try {
        this.store.dispatch(AuthActionCreators.loginSuccess(JSON.parse(token)));
      } catch (e) {
        localStorage.clear('token');
      }
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Layout>
            <Route exact path='/' component={requireAuth(App)}/>
            <Route exact path='/parent/:parentID' component={requireAuth(App)}/>
            <Route exact path='/home' component={HomePage}/>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
