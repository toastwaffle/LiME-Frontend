import '../css/EditTagsModal.css';
import {ModalActionCreators} from '../actions/modals';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';

class EditTagsModal extends React.Component {
  render() {
    return (
      <Modal className='EditTagsModal'>
        <I18n component='h3'>EDIT_TAGS</I18n>
      </Modal>
    );
  }
}
EditTagsModal.propTypes = {
  modalActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    tagActions: bindActionCreators(TagActionCreators, dispatch),
    modalActions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(EditTagsModal);
