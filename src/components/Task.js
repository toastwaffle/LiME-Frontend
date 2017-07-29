import '../styles/Task.css';
import {DragSource, DropTarget} from 'react-dnd';
import {Link} from 'react-router-dom';
import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';
import MdClose from 'react-icons/lib/md/close';
import MdList from 'react-icons/lib/md/list';
import PropTypes from 'prop-types';
import React from 'react';
import ReactSVG from 'react-svg';
import TaskList from './TaskList';
import rootTree from '../resources/root-tree.svg';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandChildren: false
    };
  }

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
    this.props.taskActions.setTaskCompletedState(this.props.task.object_id, true);
  }

  markAsUncompleted() {
    this.props.taskActions.setTaskCompletedState(this.props.task.object_id, false);
  }

  toggleExpandChildren() {
    this.setState({
      expandChildren: !this.state.expandChildren
    });
  }

  render() {
    const {task, alternateDepth, connectDragSource, connectDropTarget, isOver, isDragging} = this.props;

    var classes = ['Task'];
    if (task.completed) classes.push('completed');
    if (isOver) classes.push('isOver');
    if (isDragging) classes.push('isDragging');

    return connectDragSource(connectDropTarget(
      <div className={classes.join(' ')}>
        <div className="mainInfo">
          {
            task.completed
              ? <MdCheckBox onClick={this.markAsUncompleted.bind(this)} className='taskCompleted' />
              : <MdCheckBoxOutlineBlank onClick={this.markAsCompleted.bind(this)} className='taskCompleted' />
          }
          <span className='title'>{task.title}</span>
          <Link to={'/parent/' + task.object_id}>
            <ReactSVG path={rootTree} className="rootTree" />
          </Link>
          <MdList className={task.has_children ? 'expandChildren hasChildren' : 'expandChildren'} onClick={this.toggleExpandChildren.bind(this)} />
          <MdClose className='deleteTask' onClick={this.deleteTask.bind(this)} />
        </div>
        {
          this.state.expandChildren
            ? <TaskList parentID={task.object_id} alternateDepth={alternateDepth} />
            : null
        }
      </div>
    ));
  }
}
Task.propTypes = {
  alternateDepth: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  deletionBehaviour: PropTypes.string, // Will be undefined while settings are loaded asynchronously.
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  modalActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    deletionBehaviour: state.settings.deletion_behaviour,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

const dragSource = {
  beginDrag(props) {
    return {
      task_id: props.task.object_id,
    };
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const dropTarget = {
  canDrop(props, monitor) {
    var task_id = monitor.getItem().task_id;

    return (task_id !== props.task.object_id && task_id !== props.task.before_id);
  },

  drop(props, monitor) {
    if (monitor.didDrop()) return;

    props.taskActions.reorderTask(
      monitor.getItem().task_id,
      props.task.object_id);
  },
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({shallow: true}) && monitor.canDrop(),
  };
}

export default (
  connect(mapStateToProps, mapDispatchToProps)(
    DragSource('TASK', dragSource, dragCollect)(
      DropTarget('TASK', dropTarget, dropCollect)(
        Task))));
