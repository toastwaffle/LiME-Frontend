import '../css/TaskTagList.css';
import {connect} from 'react-redux';
import {preventParentScroll} from '../utils';
import PropTypes from 'prop-types';
import React from 'react';
import TaskTag from './TaskTag';

class TaskTagList extends React.Component {
  render() {
    let task_id = this.props.task.object_id;
    let tags = this.props.tags.map(
      tag => {
        return tag !== undefined
          ? <TaskTag
            tag={tag}
            task_id={task_id}
            key={task_id + '-' + tag.object_id}
            editMode={this.props.editMode} />
          : null;});

    return <ul className='TaskTagList' ref={preventParentScroll}>{tags}</ul>;
  }
}
TaskTagList.propTypes = {
  editMode: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  return {
    tags: props.task.tag_ids.map(tag_id => state.tags[tag_id]),
  };
}

export default connect(mapStateToProps, null)(TaskTagList);
