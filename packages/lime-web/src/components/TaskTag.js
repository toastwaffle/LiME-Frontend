import '../css/TaskTag.css';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withTitle} from '../utils';
import MdClose from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';

class TaskTag extends React.Component {
  removeTag() {
    this.props.actions.removeTagFromTasks(
      this.props.tag.object_id, [this.props.task_id]);
  }

  render() {
    var RemoveTag = withTitle(MdClose);
    return (
      <li className='TaskTag'>
        {this.props.tag.title}
        {
          this.props.editMode
            ? <RemoveTag
              className='removeTag'
              onClick={this.removeTag.bind(this)}
              title='REMOVE_TAG' />
            : null
        }
      </li>
    );
  }
}
TaskTag.propTypes = {
  actions: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  task_id: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TagActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TaskTag);
