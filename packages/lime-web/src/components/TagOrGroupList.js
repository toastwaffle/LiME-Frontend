import '../css/TagOrGroupList.css';
import {handleChange} from '../utils';
import I18n from './I18n';
import PropTypes from 'prop-types';
import React from 'react';
import TagOrGroupListItem from './TagOrGroupListItem';

export default class TagOrGroupList extends React.Component {
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
      this.props.addAction(this.state.title, this.clearForm.bind(this));
    }
  }

  render() {
    return (
      <ul className='TagOrGroupList'>
        {this.props.tagsOrGroups.map(tagOrGroup =>
          <TagOrGroupListItem
            tagOrGroup={tagOrGroup}
            key={tagOrGroup.object_id}
            editAction={this.props.editAction}
            deleteAction={this.props.deleteAction} />)}
        <li className='addTag'>
          <I18n
            component='input'
            type='text'
            placeholder={this.props.placeholder}
            value={this.state.title}
            onChange={handleChange('title').bind(this)}
            onKeyPress={this.maybeSubmit.bind(this)} />
        </li>
      </ul>
    );
  }
}
TagOrGroupList.propTypes = {
  addAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  tagsOrGroups: PropTypes.array.isRequired,
};
