import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {TaskActionCreators} from '../actions/tasks';
import Task from '../components/Task';
import NewTaskForm from '../components/NewTaskForm';

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
            <p>No tasks here yet. Add one below...</p>
          </div>
        );
      }
    } else {
      tasks = (
        <div className='tasksLoading'>
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div className='TaskList'>
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
