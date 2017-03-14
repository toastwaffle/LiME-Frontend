import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {AuthActionCreators} from '../actions/auth';

import logo from '../resources/logo.svg';
import '../styles/Header.css';

class Header extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <header className='Header'>
        <Link to='/'>
          <img src={logo} className='Header-logo' alt='logo' />
          <h2>LiME</h2>
        </Link>
        {
          this.props.isAuthenticated ?
          <button onClick={this.logout.bind(this)}>Log out</button> :
          null
        }
      </header>
    );
  }
}
Header.propTypes = {
  actions: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.backend.isAuthenticated()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
