import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdClose from 'react-icons/lib/md/close';
import MdList from 'react-icons/lib/md/list';

import {TaskActionCreators} from '../actions/tasks';
import TaskList from './TaskList';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandChildren: false
    };
  }

  markAsCompleted () {
    this.props.actions.setTaskCompletedState(this.props.task.object_id, true);
  }

  markAsUncompleted () {
    this.props.actions.setTaskCompletedState(this.props.task.object_id, false);
  }

  toggleExpandChildren () {
    this.setState({
      expandChildren: !this.state.expandChildren
    });
  }

  render () {
    return (
      <div className={this.props.task.completed ? 'Task completed' : 'Task'}>
        <div className="mainInfo">
          {
            this.props.task.completed ?
            <MdCheckBox onClick={this.markAsUncompleted.bind(this)} className='taskCompleted' /> :
            <MdCheckBoxOutlineBlank onClick={this.markAsCompleted.bind(this)} className='taskCompleted' />
          }
          <span className='title'>{this.props.task.title}</span>
          <MdList className='expandChildren' onClick={this.toggleExpandChildren.bind(this)} />
        </div>
        {
          this.state.expandChildren ?
          <TaskList parentID={this.props.task.object_id} alternateDepth={this.props.alternateDepth} /> :
          null
        }
      </div>
    );
  }
}
Task.propTypes = {
  task: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  alternateDepth: React.PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Task);
