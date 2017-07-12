import {AuthActionCreators} from '../actions/auth';
import {FormBase} from './hoc/forms';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

class LoginForm extends FormBase {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login(e) {
    e.preventDefault();
    this.props.actions.login(
      this.state.email, this.state.password, this.props.next);
  }

  render() {
    return (
      <div className='LoginForm'>
        <h3>Log in...</h3>
        {this.props.statusText ? <div className=''>{this.props.statusText}</div> : ''}
        <form>
          <input type='email' placeholder='Email' value={this.state.email} onChange={this.handleChange('email').bind(this)} />
          <input type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange('password').bind(this)} />
          <button type='submit' disabled={this.props.isAuthenticating} onClick={this.login.bind(this)}>Log in</button>
        </form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticating: PropTypes.bool.isRequired,
  next: PropTypes.string.isRequired,
  statusText: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.loginStatusText
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
