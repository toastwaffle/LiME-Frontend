import '../css/EditTagsModal.css';
import {ModalActionCreators} from '../actions/modals';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {propertyComparator} from '../utils';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';
import TagGroupListItem from './TagGroupListItem';
import TagListItem from './TagListItem';

class EditTagsModal extends React.Component {
  render() {
    return (
      <Modal className='EditTagsModal'>
        <I18n component='h3'>EDIT_TAGS</I18n>
        <I18n component='h4'>TAG_GROUPS</I18n>
        <I18n component='p'>TAG_GROUPS_EXPLANATION</I18n>
        <ul id='tagGroupList'>
          {this.props.tagGroups.map(tagGroup => <TagGroupListItem tagGroup={tagGroup} key={tagGroup.object_id} />)}
        </ul>
        <I18n component='h4'>UNGROUPED_TAGS</I18n>
        <I18n component='p'>UNGROUPED_TAGS_EXPLANATION</I18n>
        <ul id='tagList'>
          {this.props.tags.map(tag => <TagListItem tag={tag} key={tag.object_id} />)}
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
