import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdClose from 'react-icons/lib/md/close';

import {ModalActionCreators} from '../actions/modals';

import '../styles/Modal.css';

class Modal extends React.Component {
  close () {
    this.props.actions.closeModal(this.props.id);
  }

  render () {
    return (
      <div className={this.props.className !== undefined ? 'Modal ' + this.props.className : 'Modal'}>
        <MdClose className="closeModal" onClick={this.close.bind(this)} />
        {this.props.children}
      </div>
    );
  }
}
Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Modal);
