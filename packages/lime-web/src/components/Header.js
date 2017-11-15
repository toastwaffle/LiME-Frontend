import '../css/Header.css';
import {Link} from 'react-router-dom';
import I18n from './I18n';
import React from 'react';
import UserHeader from './UserHeader';
import logo from '../resources/logo.svg';

export default class Header extends React.Component {
  render() {
    return (
      <header className='Header'>
        <Link to='/'>
          <img src={logo} className='Header-logo' alt='logo' />
        </Link>
        <h2><I18n component={Link} to='/'>LIME</I18n></h2>
        <UserHeader />
      </header>
    );
  }
}
