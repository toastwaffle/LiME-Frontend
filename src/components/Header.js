import '../styles/Header.css';
import {Link} from 'react-router-dom';
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
        <h2><Link to='/'>LiME</Link></h2>
        <UserHeader />
      </header>
    );
  }
}
