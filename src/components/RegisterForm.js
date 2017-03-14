import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FormBase from './FormBase';
import {AuthActionCreators} from '../actions/auth';

class RegisterForm extends FormBase{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  register(e) {
    e.preventDefault();
    this.props.actions.register(
      this.state.email, this.state.password, this.state.name, this.props.next);
  }

  render () {
    return (
      <div className='RegisterForm'>
        <h3>Log in...</h3>
        {this.props.statusText ? <div className=''>{this.props.statusText}</div> : ''}
        <form role='form'>
          <input type='email' placeholder='Email' value={this.state.email} onChange={this.handleChange('email').bind(this)} />
          <input type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange('password').bind(this)} />
          <input type='text' placeholder='Name' value={this.state.name} onChange={this.handleChange('name').bind(this)} />
          <button type='submit' disabled={this.props.isAuthenticating} onClick={this.register.bind(this)}>Register</button>
        </form>
      </div>
    );
  }
}
RegisterForm.propTypes = {
  actions: React.PropTypes.object.isRequired,
  statusText: React.PropTypes.string,
  next: React.PropTypes.string.isRequired,
  isAuthenticating: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.registerStatusText
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
