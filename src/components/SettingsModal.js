import {Settings, createSetting} from '../utils/settings';
import I18n from './I18n';
import Modal from './Modal';
import PropTypes from 'prop-types';
import React from 'react';

export default class SettingsModal extends React.Component {
  render() {
    return (
      <Modal className='SettingsModal' id={this.props.id}>
        <I18n component='h3'>SETTINGS</I18n>
        {Settings.map(createSetting)}
      </Modal>
    );
  }
}
SettingsModal.propTypes = {
  id: PropTypes.string.isRequired,
};
