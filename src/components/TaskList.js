import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {TaskActionCreators} from '../actions/tasks';
import Task from '../components/Task';
import NewTaskForm from '../components/NewTaskForm';

import '../styles/TaskList.css';

class TaskList extends React.Component {
  componentDidMount() {
    if (!this.props.childrenLoaded) {
      this.props.actions.getTasks(this.props.parentID);
    }
  }

  render () {
    var tasks;
    if (this.props.childrenLoaded) {
      if (this.props.tasks.length > 0) {
        tasks = this.props.tasks.map(
            task => <Task task={task} key={task.object_id} alternateDepth={!this.props.alternateDepth} />);
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
        <NewTaskForm parentID={this.props.parentID} />
      </div>
    );
  }
}
TaskList.propTypes = {
  // parentID can be null, so can't set isRequired
  parentID: React.PropTypes.number,
  alternateDepth: React.PropTypes.bool.isRequired,
  tasks: React.PropTypes.array.isRequired,
  childrenLoaded: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    tasks: Object.values(state.tasks.byID).filter((task) => {
      return task.parent_id === props.parentID;
    }),
    childrenLoaded: state.tasks.childrenLoaded[props.parentID] !== undefined
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
