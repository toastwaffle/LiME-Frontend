import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {TaskActionCreators} from '../actions/tasks';
import Task from '../components/Task';
import NewTaskForm from '../components/NewTaskForm';

import '../styles/TaskList.css';

class TaskList extends React.Component {
  componentDidMount() {
    if (this.props.taskIDs === undefined) {
      this.props.actions.getTasks()
    }
  }

  render () {
    var tasks;
    if (this.props.taskIDs !== undefined) {
      if (this.props.taskIDs.length > 0) {
        tasks = this.props.taskIDs.map(
            taskID => <Task id={taskID} key={taskID} />);
      } else {
        tasks = (
          <div className='noTasks'>
            No tasks here yet. Add one below...
          </div>
        );
      }
    } else {
      tasks = (
        <div className='tasksLoading'>
          Loading...
        </div>
      );
    }
    return (
      <div className={this.props.alternateDepth ? 'TaskList alternateDepth' : 'TaskList'}>
        <div className='tasks'>
          {tasks}
        </div>
        <NewTaskForm />
      </div>
    );
  }
}
TaskList.propTypes = {
  taskIDs: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    taskIDs: state.tasks.taskIDs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
