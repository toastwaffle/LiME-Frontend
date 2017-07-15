import '../styles/TaskList.css';
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
    if (!newProps.childrenLoaded) {
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
  parentID: PropTypes.number,
  alternateDepth: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  childrenLoaded: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
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
