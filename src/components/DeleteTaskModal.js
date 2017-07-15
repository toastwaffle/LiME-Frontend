import '../styles/DeleteTaskModal.css';
import {ModalActionCreators} from '../actions/modals';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';

class DeleteTaskModal extends React.Component {
  deleteChildren() {
    this.props.taskActions.deleteTask(this.props.task, true);
    this.props.modalActions.closeModal(this.props.id);
  }

  reparentChildren() {
    this.props.taskActions.deleteTask(this.props.task, false);
    this.props.modalActions.closeModal(this.props.id);
  }

  render() {
    return (
      <Modal className='DeleteTaskModal' id={this.props.id}>
        <I18n component='p'>DELETE_MODAL</I18n>
        <I18n component='button' className='reparentChildren' onClick={this.reparentChildren.bind(this)}>MOVE_CHILDREN</I18n>
        <I18n component='button' className='deleteChildren' onClick={this.deleteChildren.bind(this)}>DELETE_CHILDREN</I18n>
        <I18n component='p' className='small'>DELETE_MODAL_SHORTCUT_HINT</I18n>
      </Modal>
    );
  }
}
DeleteTaskModal.propTypes = {
  id: PropTypes.string.isRequired,
  modalActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskActions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DeleteTaskModal);
