import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {propertyComparator} from '../utils';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';
import TagOrGroupList from './TagOrGroupList';

class EditTagGroupModal extends React.Component {
  render() {
    return (
      <Modal className='EditTagGroupModal'>
        <I18n component='h3'>EDIT_TAG_GROUP</I18n>
        <I18n component='h4'>{this.props.tagGroup.title}</I18n>
        <TagOrGroupList
          tagsOrGroups={this.props.tags}
          placeholder='NEW_TAG'
          addAction={(title, clearForm) => this.props.tagActions.addTag(title, this.props.tagGroup.object_id, clearForm)}
          deleteAction={this.props.tagActions.deleteTag}
          editAction={tag => this.props.modalActions.showModal(Modals.EDIT_TAG, {tag})} />
      </Modal>
    );
  }
}
EditTagGroupModal.propTypes = {
  modalActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  tagGroup: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  return {
    tags: Object.values(state.tags).filter(tag => tag.group_id === props.tagGroup.object_id).sort(propertyComparator('title')),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tagActions: bindActionCreators(TagActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTagGroupModal);
