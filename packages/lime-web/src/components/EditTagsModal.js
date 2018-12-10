import '../css/tagOrGroupList.css';
import {ModalActionCreators} from '../actions/modals';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {handleChange,propertyComparator} from '../utils';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';
import TagGroupListItem from './TagGroupListItem';
import TagListItem from './TagListItem';

class EditTagsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagGroupTitle: '',
      newTagTitle: '',
    };
  }

  clearTagGroupForm() {
    this.setState({newTagGroupTitle: ''});
  }

  clearTagForm() {
    this.setState({newTagTitle: ''});
  }

  maybeSubmitNewTagGroup(e) {
    if (e && e.key === 'Enter') {
      e.preventDefault();
      this.props.tagActions.addTagGroup(this.state.newTagGroupTitle, this.clearTagGroupForm.bind(this));
    }
  }

  maybeSubmitNewTag(e) {
    if (e && e.key === 'Enter') {
      e.preventDefault();
      this.props.tagActions.addTag(this.state.newTagTitle, null /* group ID */, this.clearTagForm.bind(this));
    }
  }

  render() {
    return (
      <Modal className='EditTagsModal'>
        <I18n component='h3'>EDIT_TAGS</I18n>
        <I18n component='h4'>TAG_GROUPS</I18n>
        <I18n component='p'>TAG_GROUPS_EXPLANATION</I18n>
        <ul className='tagOrGroupList'>
          {this.props.tagGroups.map(tagGroup => <TagGroupListItem tagGroup={tagGroup} key={tagGroup.object_id} />)}
          <li className='addTag'>
            <I18n
              component='input'
              type='text'
              placeholder='NEW_TAG_GROUP'
              value={this.state.newTagGroupTitle}
              onChange={handleChange('newTagGroupTitle').bind(this)}
              onKeyPress={this.maybeSubmitNewTagGroup.bind(this)} />
          </li>
        </ul>
        <I18n component='h4'>UNGROUPED_TAGS</I18n>
        <I18n component='p'>UNGROUPED_TAGS_EXPLANATION</I18n>
        <ul className='tagOrGroupList'>
          {this.props.tags.map(tag => <TagListItem tag={tag} key={tag.object_id} />)}
          <li className='addTag'>
            <I18n
              component='input'
              type='text'
              placeholder='NEW_TAG'
              value={this.state.newTagTitle}
              onChange={handleChange('newTagTitle').bind(this)}
              onKeyPress={this.maybeSubmitNewTag.bind(this)} />
          </li>
        </ul>
      </Modal>
    );
  }
}
EditTagsModal.propTypes = {
  modalActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  tagGroups: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    tagGroups: Object.values(state.tag_groups).sort(propertyComparator('title')),
    tags: Object.values(state.tags).filter(tag => tag.group_id === null).sort(propertyComparator('title')),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tagActions: bindActionCreators(TagActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTagsModal);
