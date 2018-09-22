import '../css/TaskTag.css';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

class TaskTag extends React.Component {
  render() {
    return <li className='TaskTag'>{this.props.tag.title}</li>;
  }
}
TaskTag.propTypes = {
  task_id: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TagActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TaskTag);
