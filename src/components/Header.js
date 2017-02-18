import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import logo from '../resources/logo.svg';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <Link to="/">
          <img src={logo} className="Header-logo" alt="logo" />
          <h2>LiME</h2>
        </Link>
      </header>
    );
  }
}

function mapState(state) {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapState)(Header);
