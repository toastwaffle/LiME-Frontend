import {AuthActionCreators} from '../actions/auth';
import {FormBase} from './hoc/forms';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

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

  render() {
    return (
      <div className='RegisterForm'>
        <h3>Log in...</h3>
        <form>
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
  actions: PropTypes.object.isRequired,
  isAuthenticating: PropTypes.bool.isRequired,
  next: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
