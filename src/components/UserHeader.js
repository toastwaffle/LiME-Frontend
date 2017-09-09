import '../css/UserHeader.css';
import {AuthActionCreators} from '../actions/auth';
import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
import MdSettings from 'react-icons/lib/md/settings';
import PropTypes from 'prop-types';
import React from 'react';

class UserHeader extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.authActions.logout();
  }

  settings(e) {
    e.preventDefault();
    this.props.modalActions.showModal(Modals.SETTINGS, {});
  }

  render() {
    if (!this.props.isAuthenticated) return null;

    return (
      <div className='UserHeader'>
        <button className='logoutButton' onClick={this.logout.bind(this)}>Log out</button>
        <div className='settings' onClick={this.settings.bind(this)}>
          <MdSettings />
        </div>
        {
          this.props.name
            ? <I18n component='p' contentI18nArgs={{name: this.props.name}}>HELLO_USER</I18n>
            : null
        }
      </div>
    );
  }
}
UserHeader.propTypes = {
  authActions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  modalActions: PropTypes.object.isRequired,
  name: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.backend.isAuthenticated(),
    name: state.settings.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
