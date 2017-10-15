import '../css/TaskNotes.css';
import {preventParentScroll} from '../utils';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class TaskNotes extends React.Component {
  render() {
    return (
      <div className='TaskNotes' ref={preventParentScroll}>
        <ReactMarkdown source={this.props.task.notes} skipHtml={true} />
      </div>
    );
  }
}
TaskNotes.propTypes = {
  task: PropTypes.object.isRequired,
};
