import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FormBase from './FormBase';
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

  render () {
    return (
      <div className='NewTaskForm'>
        <form role='form'>
          <input type='text' placeholder='New Task...' value={this.state.title}
              onChange={this.handleChange('title').bind(this)} onKeyPress={this.maybeSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}
NewTaskForm.propTypes = {
  parentID: React.PropTypes.number
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewTaskForm);
