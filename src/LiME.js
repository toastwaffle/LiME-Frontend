import React, { Component } from 'react';
import logo from './logo.svg';
import './LiME.css';

export default class LiME extends Component {
  render() {
    return (
      <div className="LiME">
        <div className="LiME-header">
          <img src={logo} className="LiME-logo" alt="logo" />
          <h2>Welcome to LiME</h2>
        </div>
      </div>
    );
  }
}
