import '../css/EditTaskNotes.css';
import {TaskActionCreators} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {preventParentScroll} from '../utils';
import FormState from './hoc/FormState';
import I18n from './I18n';
import PropTypes from 'prop-types';
import React from 'react';

class EditTaskNotes extends FormState {
  render() {
    return (
      <div className={this.state.saved ? 'EditTaskNotes saved' : 'EditTaskNotes'}>
        <I18n
          component='textarea'
          childRef={preventParentScroll}
          value={this.state.value}
          onChange={this.handleChange().bind(this)}
          onBlur={this.saveChanges.bind(this)}
          placeholder='NOTES' />
      </div>
    );
  }
}
EditTaskNotes.propTypes = {
  task_id: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch, props) {
  var updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);
  return {
    saveValue: function(value, markSaved) {
      updateTask(props.task_id, {notes: value}, markSaved);
    }
  };
}

export default connect(null, mapDispatchToProps)(EditTaskNotes);
