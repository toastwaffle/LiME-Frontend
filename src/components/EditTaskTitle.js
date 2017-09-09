import '../css/EditTaskTitle.css';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FormState from './hoc/FormState';
import PropTypes from 'prop-types';
import React from 'react';

class EditTaskTitle extends FormState {
  render() {
    return (
      <div className={this.state.saved ? 'EditTaskTitle saved' : 'EditTaskTitle'}>
        <input
          type='text'
          value={this.state.value}
          onChange={this.handleChange().bind(this)}
          onBlur={this.saveChanges.bind(this)}
          autoFocus
        />
      </div>
    );
  }
}
EditTaskTitle.propTypes = {
  task_id: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch, props) {
  var updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);
  return {
    saveValue: function(value, markSaved) {
      updateTask(props.task_id, {title: value}, markSaved);
    }
  };
}

export default connect(null, mapDispatchToProps)(EditTaskTitle);
