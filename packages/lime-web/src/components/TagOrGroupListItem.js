import '../css/TagOrGroupListItem.css';
import {MdClose,MdEdit} from 'react-icons/md';
import {withTitle} from '../utils';
import PropTypes from 'prop-types';
import React from 'react';

export default class TagOrGroupListItem extends React.Component {
  delete() {
    this.props.deleteAction(this.props.tagOrGroup);
  }

  edit() {
    this.props.editAction(this.props.tagOrGroup);
  }

  render() {
    var Edit = withTitle(MdEdit);
    var Delete = withTitle(MdClose);
    return (
      <li className='TagOrGroupListItem'>
        {this.props.tagOrGroup.title}
        <Delete
          className='deleteTagOrGroup'
          onClick={this.delete.bind(this)}
          title='DELETE' />
        <Edit
          className='editTagOrGroup'
          onClick={this.edit.bind(this)}
          title='EDIT' />
      </li>
    );
  }
}
TagOrGroupListItem.propTypes = {
  tagOrGroup: PropTypes.object.isRequired,
  editAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
};
