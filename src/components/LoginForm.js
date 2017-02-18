import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {AuthActionCreators} from '../actions/auth';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    this.props.actions.loginUser(
      this.state.email, this.state.password, this.props.next);
  }

  handleChange(field) {
    return function(event) { this.setState({[field]: event.target.value}); };
  }

  render () {
    return (
      <div className="LoginForm">
        <h3>Log in...</h3>
        {this.props.statusText ? <div className=''>{this.props.statusText}</div> : ''}
        <form role='form'>
          <input type='email' placeholder='Email' value={this.state.email} onChange={this.handleChange('email').bind(this)} />
          <input type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange('password').bind(this)} />
          <button type='submit' disabled={this.props.isAuthenticating} onClick={this.login.bind(this)}>Log in</button>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  actions: React.PropTypes.object.isRequired,
  statusText: React.PropTypes.string.isRequired,
  next: React.PropTypes.string.isRequired,
  isAuthenticating: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(AuthActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
