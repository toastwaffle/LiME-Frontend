import '../css/Task.css';
import {DragSource, DropTarget} from 'react-dnd';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleState} from '../utils';
import Config from '../Config';
import PropTypes from 'prop-types';
import React from 'react';
import TaskDetails from './TaskDetails';
import TaskList from './TaskList';
import TaskMainInfo from './TaskMainInfo';
import TaskTagMenu from './TaskTagMenu';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandChildren: false,
      expandChildrenForDragging: false,
      dragTimeout: null,
      editMode: false,
      showDetails: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOver !== this.props.isOver) {
      if (this.state.dragTimeout !== null) {
        clearTimeout(this.state.dragTimeout);
      }
      this.setState({
        dragTimeout: setTimeout(function() {
          this.setState({
            expandChildrenForDragging: this.props.isOver,
            dragTimeout: null,
          });
        }.bind(this), Config.dragExpandChildrenTimeout),
      });
    }
  }

  render() {
    var classes = ['Task'];
    if (this.props.isOverSelfOnly && this.props.canDrop) classes.push('dropHere');
    if (this.props.isDragging) classes.push('isDragging');
    if (this.state.expandChildren) classes.push('expandChildren');
    if (this.state.editMode) classes.push('editMode');

    var mainInfoProps = {
      childrenExpanded: this.state.expandChildren,
      editMode: this.state.editMode,
      detailsShown: this.state.showDetails,
      showTagMenu: this.state.showTagMenu,
      task: this.props.task,
      toggleExpandChildren: toggleState('expandChildren').bind(this),
      toggleEditMode: toggleState('editMode').bind(this),
      toggleDetails: toggleState('showDetails').bind(this),
      toggleTagMenu: toggleState('showTagMenu').bind(this),
      connectDragSource: this.props.connectDragSource,
      connectDragPreview: this.props.connectDragPreview,
    };

    var taskDetailsProps = {
      editMode: this.state.editMode,
      task: this.props.task,
    };

    return this.props.connectDropTarget(
      <div className={classes.join(' ')}>
        <div className='taskInfo'>
          <TaskMainInfo {...mainInfoProps} />
          {
            (this.state.showDetails || this.state.editMode) && !this.props.isDragging
              ? <TaskDetails {...taskDetailsProps} />
              : null
          }
        </div>
        {
          this.state.showTagMenu
            ? <TaskTagMenu />
            : null
        }
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
  actions: PropTypes.object.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

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

    props.actions.reorderTask(
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
  connect(null, mapDispatchToProps)(
    DragSource('TASK', dragSource, dragCollect)(
      DropTarget('TASK', dropTarget, dropCollect)(
        Task))));
