import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdClose from 'react-icons/lib/md/close';

import {ModalActionCreators} from '../actions/modals';

import '../styles/Modal.css';

class Modal extends React.Component {
  dontClose(e) {
    e.stopPropagation();
  }

  close() {
    this.props.actions.closeModal(this.props.id);
  }

  render() {
    return (
      <div className={this.props.className !== undefined ? 'Modal ' + this.props.className : 'Modal'} onClick={this.dontClose}>
        <MdClose className="closeModal" onClick={this.close.bind(this)} />
        {this.props.children}
      </div>
    );
  }
}
Modal.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Modal);
