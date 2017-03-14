import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';

import '../styles/Layout.css';

export default class Layout extends React.Component {
  render () {
    return (
      <div className='Layout'>
        <Header />
        <Messages />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  children: React.PropTypes.node.isRequired
};
