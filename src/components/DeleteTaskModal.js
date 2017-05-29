import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ModalActionCreators} from '../actions/modals';
import {TaskActionCreators} from '../actions/tasks';

import Modal from './Modal';

import '../styles/DeleteTaskModal.css';

class DeleteTaskModal extends React.Component {
  deleteChildren() {
    this.props.taskActions.deleteTask(this.props.task, true);
    this.props.modalActions.closeModal(this.props.id);
  }

  reparentChildren() {
    this.props.taskActions.deleteTask(this.props.task, false);
    this.props.modalActions.closeModal(this.props.id);
  }

  render () {
    return (
      <Modal className='DeleteTaskModal' id={this.props.id}>
        <p>
          You are trying to delete a task which has children. You can either move
          the children to the parent task, or delete all of the children as well.
        </p>
        <button className='reparentChildren' onClick={this.reparentChildren.bind(this)}>Move Children</button>
        <button className='deleteChildren' onClick={this.deleteChildren.bind(this)}>Delete Children</button>
        <p className='small'>
          P.S. To skip this dialog in future, hold ctrl while pressing the delete
          button to move the children to the parent, or hold shift to delete the
          children.
        </p>
      </Modal>
    );
  }
}
DeleteTaskModal.propTypes = {
  id: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DeleteTaskModal);
