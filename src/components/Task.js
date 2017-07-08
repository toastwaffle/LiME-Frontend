import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MdCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';
import MdCheckBox from 'react-icons/lib/md/check-box';
import MdClose from 'react-icons/lib/md/close';
import MdList from 'react-icons/lib/md/list';
import ReactSVG from 'react-svg';

import {ModalActionCreators} from '../actions/modals';
import {TaskActionCreators} from '../actions/tasks';
import TaskList from './TaskList';
import {Modals} from '../utils/modals';

import rootTree from '../resources/root-tree.svg';
import '../styles/Task.css';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandChildren: false
    };
  }

  deleteTask (e) {
    if (!this.props.task.has_children || e.ctrlKey) {
      this.props.taskActions.deleteTask(this.props.task, false);
    } else if (e.shiftKey) {
      this.props.taskActions.deleteTask(this.props.task, true);
    } else {
      this.props.modalActions.showModal(Modals.DELETE_TASK, {task: this.props.task});
    }
  }

  markAsCompleted () {
    this.props.taskActions.setTaskCompletedState(this.props.task.object_id, true);
  }

  markAsUncompleted () {
    this.props.taskActions.setTaskCompletedState(this.props.task.object_id, false);
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
            this.props.task.completed
              ? <MdCheckBox onClick={this.markAsUncompleted.bind(this)} className='taskCompleted' />
              : <MdCheckBoxOutlineBlank onClick={this.markAsCompleted.bind(this)} className='taskCompleted' />
          }
          <span className='title'>{this.props.task.title}</span>
          <Link to={'/parent/' + this.props.task.object_id}>
            <ReactSVG path={rootTree} className="rootTree" />
          </Link>
          <MdList className={this.props.task.has_children ? 'expandChildren hasChildren' : 'expandChildren'} onClick={this.toggleExpandChildren.bind(this)} />
          <MdClose className='deleteTask' onClick={this.deleteTask.bind(this)} />
        </div>
        {
          this.state.expandChildren
            ? <TaskList parentID={this.props.task.object_id} alternateDepth={this.props.alternateDepth} />
            : null
        }
      </div>
    );
  }
}
Task.propTypes = {
  alternateDepth: PropTypes.bool.isRequired,
  modalActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskActions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Task);
