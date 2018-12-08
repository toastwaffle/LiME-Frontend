import '../css/Modal.css';
import {MdArrowBack,MdClose} from 'react-icons/md';
import {ModalActionCreators} from '../actions/modals';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

class Modal extends React.Component {
  dontClose(e) {
    e.stopPropagation();
  }

  closeTop() {
    this.props.actions.closeTopModal();
  }

  closeAll() {
    this.props.actions.closeAllModals();
  }

  render() {
    return (
      <div className={this.props.className !== undefined ? 'Modal ' + this.props.className : 'Modal'} onClick={this.dontClose}>
        {
          this.props.hasPrevious
            ? <MdArrowBack className="previousModal" onClick={this.closeTop.bind(this)} />
            : null
        }
        <MdClose className="closeModal" onClick={this.closeAll.bind(this)} />
        {this.props.children}
      </div>
    );
  }
}
Modal.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasPrevious: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {hasPrevious: state.modals.length > 1};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
