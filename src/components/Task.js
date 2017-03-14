import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {TaskActionCreators} from '../actions/tasks';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.tasksByID[props.id];
  }

  render () {
    return (
      <div className='Task'>
        {this.task.title}
      </div>
    );
  }
}
Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  tasksByID: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tasksByID: state.tasks.tasksByID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
