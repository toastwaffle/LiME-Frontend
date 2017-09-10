import '../css/TaskDetails.css';
import {preventParentScroll} from '../utils';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class TaskDetails extends React.Component {
  render () {
    return (
      <div className='TaskDetails'>
        <div className='notesWrapper'>
          <div className='notes' ref={preventParentScroll}>
            <ReactMarkdown source={this.props.task.notes} skipHtml={true} />
          </div>
        </div>
      </div>
    );
  }
}
TaskDetails.propTypes = {
  task: PropTypes.object.isRequired
};
