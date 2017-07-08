import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MdFileUpload from 'react-icons/lib/md/file-upload';

import {TaskActionCreators} from '../actions/tasks';

import '../styles/TaskHeader.css';

class TaskHeader extends React.Component {
  componentDidMount() {
    if (this.props.task === undefined) {
      this.props.actions.getTask(this.props.taskID);
    }
  }

  render() {
    if (this.props.task === undefined) {
      return null;
    }
    return (
      <div className='TaskHeader'>
        <Link to={
          this.props.task.parent_id === null
            ? '/'
            : '/parent/' + this.props.task.parent_id
        }>
          <MdFileUpload className="goUp" />
        </Link>
        <h2>{this.props.task.title}</h2>
      </div>
    );
  }
}
TaskHeader.propTypes = {
  actions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  taskID: PropTypes.number.isRequired,
};

function mapStateToProps(state, props) {
  return {
    task: state.tasks.byID[props.taskID],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskHeader);
