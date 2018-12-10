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

class TagListItem extends React.Component {
  delete() {
    this.props.tagActions.deleteTag(this.props.tag.object_id);
  }

  edit() {
    this.props.modalActions.showModal(Modals.EDIT_TAG, {tag: this.props.tag});
  }

  render() {
    var EditTagGroup = withTitle(MdEdit);
    var DeleteTagGroup = withTitle(MdClose);
    return (
      <li className='TagListItem'>
        {this.props.tag.title}
        <DeleteTagGroup
          className='deleteTagOrGroup'
          onClick={this.delete.bind(this)}
          title='DELETE' />
        <EditTagGroup
          className='editTagOrGroup'
          onClick={this.edit.bind(this)}
          title='EDIT' />
      </li>
    );
  }
}
TagListItem.propTypes = {
  modalActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
    tagActions: bindActionCreators(TagActionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(TagListItem);
