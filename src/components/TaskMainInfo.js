import '../styles/TaskMainInfo.css';
import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {curry, loadSVG, withTitle} from '../utils';
import {push} from 'react-router-redux';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';
import MdClose from 'react-icons/lib/md/close';
import MdDone from 'react-icons/lib/md/done';
import MdEdit from 'react-icons/lib/md/edit';
import MdList from 'react-icons/lib/md/list';
import PropTypes from 'prop-types';
import React from 'react';
import dragHandle from '../resources/drag-handle.svg';
import rootTree from '../resources/root-tree.svg';

class TaskMainInfo extends React.Component {
  deleteTask (e) {
    if (!this.props.task.has_children || e.ctrlKey || this.props.deletionBehaviour === 'REPARENT') {
      this.props.taskActions.deleteTask(this.props.task, false);
    } else if (e.shiftKey || this.props.deletionBehaviour === 'CASCADE') {
      this.props.taskActions.deleteTask(this.props.task, true);
    } else {
      this.props.modalActions.showModal(Modals.DELETE_TASK, {task: this.props.task});
    }
  }

  markAsCompleted() {
    this.props.taskActions.updateTask(this.props.task.object_id, {completed: true});
  }

  markAsUncompleted() {
    this.props.taskActions.updateTask(this.props.task.object_id, {completed: false});
  }

  render() {
    var Done = withTitle(MdDone);
    var Edit = withTitle(MdEdit);
    var RootHere = loadSVG(rootTree);
    var DragHandle = loadSVG(dragHandle);

    var handle = this.props.connectDragSource(
      <div>
        <DragHandle className="dragHandle" />
      </div>
    );

    return this.props.connectDragPreview(
      <div className="TaskMainInfo">
        {handle}
        {
          this.props.task.completed
            ? <MdCheckBox onClick={this.markAsUncompleted.bind(this)} className='taskCompleted' />
            : <MdCheckBoxOutlineBlank onClick={this.markAsCompleted.bind(this)} className='taskCompleted' />
        }
        <span className='title'>{this.props.task.title}</span>
        {
          this.props.editMode
            ? <Done className='editMode' onClick={this.props.toggleEditMode} title="DONE_EDITING" />
            : <Edit className='editMode' onClick={this.props.toggleEditMode} title="EDIT_TASK" />
        }
        <RootHere className="rootTree" onClick={curry(this.props.goTo, '/parent/' + this.props.task.object_id)} />
        <MdList className={this.props.task.has_children ? 'expandChildren hasChildren' : 'expandChildren'} onClick={this.props.toggleExpandChildren} />
        <MdClose className='deleteTask' onClick={this.deleteTask.bind(this)} />
      </div>
    );
  }
}
TaskMainInfo.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  deletionBehaviour: PropTypes.string, // Will be undefined while settings are loaded asynchronously.
  editMode: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired,
  modalActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskActions: PropTypes.object.isRequired,
  toggleExpandChildren: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    deletionBehaviour: state.settings.deletion_behaviour,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
    goTo: bindActionCreators(push, dispatch),
  };
}

export default (
  connect(mapStateToProps, mapDispatchToProps)(TaskMainInfo));
