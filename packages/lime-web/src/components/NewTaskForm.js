import '../css/NewTaskForm.css';
import {DropTarget} from 'react-dnd';
import {MdAddBox} from 'react-icons/md';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handleChange} from '../utils';
import I18n from './I18n';
import PropTypes from 'prop-types';
import React from 'react';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  clearForm() {
    this.setState({title: ''});
  }

  maybeSubmit(e) {
    if (e && e.key === 'Enter') {
      e.preventDefault();
      this.props.actions.addTask(this.props.parentID, this.state.title, this.clearForm.bind(this));
    }
  }

  focusInput() {
    this.taskInput.focus();
  }

  render() {
    return this.props.connectDropTarget(
      <div className={this.props.isOver ? 'NewTaskForm isOver' : 'NewTaskForm'}>
        <MdAddBox className='addTaskIcon' onClick={this.focusInput.bind(this)} />
        <form>
          <I18n
            component='input'
            type='text'
            placeholder='NEW_TASK'
            value={this.state.title}
            childRef={(input) => { this.taskInput = input; }}
            onChange={handleChange('title').bind(this)}
            onKeyPress={this.maybeSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}
NewTaskForm.propTypes = {
  actions: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  parentID: PropTypes.number,
  lastTaskID: PropTypes.number,
  isOver: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

const dropTarget = {
  canDrop(props, monitor) {
    return (monitor.getItem().task_id !== props.lastTaskID);
  },

  drop(props, monitor) {
    if (monitor.didDrop()) return;

    if (props.lastTaskID === null) {
      props.actions.reparentTask(
        monitor.getItem().task_id,
        props.parentID);
    } else {
      props.actions.reorderTask(
        monitor.getItem().task_id,
        null,
        props.lastTaskID);
    }
  },
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({shallow: true}) && monitor.canDrop(),
  };
}

export default (
  connect(null, mapDispatchToProps)(
    DropTarget('TASK', dropTarget, dropCollect)(
      NewTaskForm)));
