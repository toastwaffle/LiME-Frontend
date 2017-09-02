import '../styles/Task.css';
import {DragSource, DropTarget} from 'react-dnd';
import {toggleState} from '../utils';
import Config from '../Config';
import PropTypes from 'prop-types';
import React from 'react';
import TaskList from './TaskList';
import TaskMainInfo from './TaskMainInfo';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandChildren: false,
      expandChildrenForDragging: false,
      dragTimeout: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.isOver !== newProps.isOver) {
      if (this.state.dragTimeout !== null) {
        clearTimeout(this.state.dragTimeout);
      }
      this.setState({
        dragTimeout: setTimeout(function() {
          this.setState({
            expandChildrenForDragging: newProps.isOver,
            dragTimeout: null,
          });
        }.bind(this), Config.dragExpandChildrenTimeout),
      });
    }
  }

  render() {
    var classes = ['Task'];
    if (this.props.task.completed) classes.push('completed');
    if (this.props.isOverSelfOnly && this.props.canDrop) classes.push('dropHere');
    if (this.props.isDragging) classes.push('isDragging');

    var mainInfoProps = {
      task: this.props.task,
      toggleExpandChildren: toggleState('expandChildren').bind(this),
      connectDragSource: this.props.connectDragSource,
      connectDragPreview: this.props.connectDragPreview,
    };

    return this.props.connectDropTarget(
      <div className={classes.join(' ')}>
        <TaskMainInfo {...mainInfoProps} />
        {
          (this.state.expandChildren || this.state.expandChildrenForDragging) && !this.props.isDragging
            ? <TaskList parentID={this.props.task.object_id} alternateDepth={this.props.alternateDepth} />
            : null
        }
      </div>
    );
  }
}
Task.propTypes = {
  alternateDepth: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  isOverSelfOnly: PropTypes.bool.isRequired,
  task: PropTypes.object.isRequired,
};

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
    connectDragPreview: connect.dragPreview(),
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
    isOver: monitor.isOver(),
    isOverSelfOnly: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
  };
}

export default (
  DragSource('TASK', dragSource, dragCollect)(
    DropTarget('TASK', dropTarget, dropCollect)(
      Task)));
