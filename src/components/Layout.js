import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from './Header';
import ModalContainer from './ModalContainer';
import Messages from './Messages';

import '../styles/Layout.css';

class Layout extends React.Component {
  render () {
    return (
      <div className={this.props.modalOpen ? 'Layout modalOpen' : 'Layout'}>
        <ModalContainer />
        <div className="content">
          <Header />
          <Messages />
          <div className='container'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

function mapStateToProps(state) {
  return {
    modalOpen: state.modals.length > 0
  };
}

export default connect(mapStateToProps)(Layout);
