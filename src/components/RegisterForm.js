import {AuthActionCreators} from '../actions/auth';
import {FormBase} from './hoc/forms';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
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
        <I18n component='h3'>REGISTER_HEADER</I18n>
        <form>
          <I18n component='input' type='email' placeholder='EMAIL' value={this.state.email} onChange={this.handleChange('email').bind(this)} />
          <I18n component='input' type='password' placeholder='PASSWORD' value={this.state.password} onChange={this.handleChange('password').bind(this)} />
          <I18n component='input' type='text' placeholder='NAME' value={this.state.name} onChange={this.handleChange('name').bind(this)} />
          <I18n component='button' type='submit' disabled={this.props.isAuthenticating} onClick={this.register.bind(this)}>REGISTER_BUTTON</I18n>
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
