import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdAddBox from 'react-icons/lib/md/add-box';

import {FormBase} from './hoc/forms';
import {TaskActionCreators} from '../actions/tasks';

import '../styles/NewTaskForm.css';

class NewTaskForm extends FormBase {
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

  render () {
    return (
      <div className='NewTaskForm'>
        <MdAddBox className='addTaskIcon' onClick={this.focusInput.bind(this)} />
        <form>
          <input type='text' placeholder='New Task...' value={this.state.title}
            ref={(input) => { this.taskInput = input; }}
            onChange={this.handleChange('title').bind(this)} onKeyPress={this.maybeSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}
NewTaskForm.propTypes = {
  parentID: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewTaskForm);
