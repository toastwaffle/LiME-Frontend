import React from 'react';
import PropTypes from 'prop-types';

import {Settings, createSetting} from '../utils/settings';

import Modal from './Modal';

export default class SettingsModal extends React.Component {
  render () {
    return (
      <Modal className='SettingsModal' id={this.props.id}>
        <h3>Settings</h3>
        {Settings.map(createSetting)}
      </Modal>
    );
  }
}
SettingsModal.propTypes = {
  id: PropTypes.string.isRequired,
};
