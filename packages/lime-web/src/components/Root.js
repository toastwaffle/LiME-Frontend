import {AuthActionCreators} from '../actions/auth';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {MessageActionCreators} from '../actions/messages';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import HomePage from './HomePage';
import Layout from './Layout';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import jwt from 'jsonwebtoken';
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
      let parsed = JSON.parse(token);
      let decoded = jwt.decode(parsed.key, {complete: true});

      if (decoded.payload.exp > Date.now()/1000) {
        try {
          this.store.dispatch(AuthActionCreators.loginSuccess(parsed));
        } catch (e) {
          localStorage.clear('token');
        }
      } else {
        localStorage.clear('token');

        this.store.dispatch(
          MessageActionCreators.addMessage('info', 'MESSAGE_TOKEN_EXPIRED'));
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
