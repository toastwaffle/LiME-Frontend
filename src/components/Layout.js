import '../styles/Layout.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from './Header';
import Messages from './Messages';
import ModalContainer from './ModalContainer';
import PropTypes from 'prop-types';
import React from 'react';

class Layout extends React.Component {
  render() {
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
  children: PropTypes.node.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    modalOpen: state.modals.length > 0
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
