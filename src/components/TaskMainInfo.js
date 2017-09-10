import '../css/TaskMainInfo.css';
import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadSVG, withArgs, withTitle} from '../utils';
import {push} from 'react-router-redux';
import EditTaskTitle from './EditTaskTitle';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';
import MdClose from 'react-icons/lib/md/close';
import MdDone from 'react-icons/lib/md/done';
import MdEdit from 'react-icons/lib/md/edit';
import MdExpandLess from 'react-icons/lib/md/expand-less';
import MdExpandMore from 'react-icons/lib/md/expand-more';
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
    var classes = ['TaskMainInfo'];
    if (this.props.task.completed) classes.push('completed');
    if (this.props.editMode) classes.push('editMode');

    var CollapseDetails = withTitle(MdExpandLess);
    var DeleteTask = withTitle(MdClose);
    var Done = withTitle(MdDone);
    var DragHandle = withTitle(loadSVG(dragHandle));
    var Edit = withTitle(MdEdit);
    var ExpandChildren = withTitle(MdList);
    var ExpandDetails = withTitle(MdExpandMore);
    var RootHere = withTitle(loadSVG(rootTree));
    var TaskCompleted = withTitle(MdCheckBox);
    var TaskUnCompleted = withTitle(MdCheckBoxOutlineBlank);

    var handle = this.props.connectDragSource(
      <div>
        <DragHandle className='dragHandle' title='MOVE_TASK' />
      </div>
    );

    return this.props.connectDragPreview(
      <div className={classes.join(' ')}>
        {handle}
        {
          this.props.task.completed
            ? <TaskCompleted onClick={this.markAsUncompleted.bind(this)} className='taskCompleted' title='MARK_UNCOMPLETED' />
            : <TaskUnCompleted onClick={this.markAsCompleted.bind(this)} className='taskCompleted' title='MARK_COMPLETED' />
        }
        {
          this.props.editMode
            ? <EditTaskTitle task_id={this.props.task.object_id} value={this.props.task.title} />
            : <span className='title'>{this.props.task.title}</span>
        }
        {
          this.props.detailsShown
            ? <CollapseDetails className='toggleDetails' onClick={this.props.toggleDetails} title='COLLAPSE_DETAILS' />
            : <ExpandDetails className='toggleDetails' onClick={this.props.toggleDetails} title='EXPAND_DETAILS' />
        }
        {
          this.props.editMode
            ? <Done className='toggleEditMode' onClick={this.props.toggleEditMode} title='DONE_EDITING' />
            : <Edit className='toggleEditMode' onClick={this.props.toggleEditMode} title='EDIT_TASK' />
        }
        <RootHere className='rootTree' onClick={withArgs(this.props.goTo, 'parent/' + this.props.task.object_id)} title='ROOT_HERE' />
        <ExpandChildren
          className={this.props.task.has_children ? 'expandChildren hasChildren' : 'expandChildren'}
          onClick={this.props.toggleExpandChildren}
          title={this.props.childrenExpanded ? 'COLLAPSE_CHILDREN' : 'EXPAND_CHILDREN'}
        />
        <DeleteTask className='deleteTask' onClick={this.deleteTask.bind(this)} title='DELETE_TASK' />
      </div>
    );
  }
}
TaskMainInfo.propTypes = {
  childrenExpanded: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  deletionBehaviour: PropTypes.string, // Will be undefined while settings are loaded asynchronously.
  detailsShown: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired,
  modalActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskActions: PropTypes.object.isRequired,
  toggleDetails: PropTypes.func.isRequired,
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
