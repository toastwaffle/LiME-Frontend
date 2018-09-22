import '../css/TaskDetails.css';
import EditTaskNotes from './EditTaskNotes';
import PropTypes from 'prop-types';
import React from 'react';
import TaskNotes from './TaskNotes';
import TaskTagList from './TaskTagList';

export default class TaskDetails extends React.Component {
  render() {
    return (
      <div className='TaskDetails'>
        <div className='notesWrapper'>
          {
            this.props.editMode
              ? <EditTaskNotes task_id={this.props.task.object_id} value={this.props.task.notes} />
              : <TaskNotes task={this.props.task} />
          }
        </div>
        <TaskTagList task={this.props.task} editMode={this.props.editMode} />
        <div className="clearfix"></div>
      </div>
    );
  }
}
TaskDetails.propTypes = {
  editMode: PropTypes.bool.isRequired,
  task: PropTypes.object.isRequired,
};
