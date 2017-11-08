import '../css/TaskList.css';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
import NewTaskForm from './NewTaskForm';
import PropTypes from 'prop-types';
import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
  componentDidMount() {
    if (!this.props.childrenLoaded) {
      this.props.actions.getTasks(this.props.parentID);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.parentID !== newProps.parentID && !newProps.childrenLoaded) {
      newProps.actions.getTasks(newProps.parentID);
    }
  }

  render() {
    var tasks;
    if (this.props.childrenLoaded) {
      if (this.props.tasks.length > 0) {
        tasks = this.props.tasks.map(
          task => <Task task={task} key={task.object_id} alternateDepth={!this.props.alternateDepth} />);
      } else {
        tasks = <I18n component='div' className='noTasks'>NO_TASKS_YET</I18n>;
      }
    } else {
      tasks = <I18n component='div' className='tasksLoading'>LOADING</I18n>;
    }

    var lastTaskID = (
      this.props.tasks.length >0
        ? this.props.tasks[this.props.tasks.length - 1].object_id
        : null);

    return (
      <div className={this.props.alternateDepth ? 'TaskList alternateDepth' : 'TaskList'}>
        <div className='tasks'>
          {tasks}
        </div>
        <NewTaskForm parentID={this.props.parentID} lastTaskID={lastTaskID} />
      </div>
    );
  }
}
TaskList.propTypes = {
  // parentID can be null, so can't set isRequired
  parentID: PropTypes.number,
  alternateDepth: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  childrenLoaded: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  var orderedTasks = [];
  // Find the first child
  var child = Object.values(state.tasks).find((task) => {
    return task.parent_id === props.parentID && task.before_id === null;
  });
  // Append children to the list by following the links.
  while (child !== undefined) {
    orderedTasks.push(child);
    child = state.tasks[child.after_id];
  }

  return {
    tasks: orderedTasks,
    childrenLoaded: state.childrenLoaded[props.parentID] !== undefined
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
