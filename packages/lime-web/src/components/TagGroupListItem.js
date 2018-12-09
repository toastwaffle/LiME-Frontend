import '../css/TaskTag.css';
import {MdClose,MdEdit} from 'react-icons/md';
import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withTitle} from '../utils';
import PropTypes from 'prop-types';
import React from 'react';

class TagGroupListItem extends React.Component {
  delete() {
    this.props.tagActions.deleteTagGroup(this.props.tagGroup);
  }

  edit() {
    this.props.modalActions.showModal(Modals.EDIT_TAG_GROUP, {tagGroup: this.props.tagGroup});
  }

  render() {
    var EditTagGroup = withTitle(MdEdit);
    var DeleteTagGroup = withTitle(MdClose);
    return (
      <li className='TagGroupListItem'>
        {this.props.tagGroup.title}
        <DeleteTagGroup
          className='deleteTagGroup'
          onClick={this.delete.bind(this)}
          title='DELETE' />
        <EditTagGroup
          className='editTagGroup'
          onClick={this.edit.bind(this)}
          title='EDIT' />
      </li>
    );
  }
}
TagGroupListItem.propTypes = {
  modalActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
  tagGroup: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
    tagActions: bindActionCreators(TagActionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(TagGroupListItem);
