import {ModalActionCreators} from '../actions/modals';
import {Modals} from '../utils/modals';
import {Settings, createSetting} from '../utils/settings';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';

export class SettingsModal extends React.Component {
  edit_tags(e) {
    e.preventDefault();
    this.props.modalActions.showModal(Modals.EDIT_TAGS, {});
  }

  render() {
    return (
      <Modal className='SettingsModal'>
        <I18n component='h3'>SETTINGS</I18n>
        {Settings.map(createSetting)}
        <I18n component='button' className='editTags' onClick={this.edit_tags.bind(this)}>EDIT_TAGS</I18n>
      </Modal>
    );
  }
}
SettingsModal.propTypes = {
  modalActions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SettingsModal);
