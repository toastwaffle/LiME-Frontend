import React from 'react';

import DeleteTaskModal from '../components/DeleteTaskModal';
import SettingsModal from '../components/SettingsModal';
import {createConstants} from '../utils';

export const Modals = createConstants(
  'DELETE_TASK',
  'SETTINGS'
);

const ModalComponents = {
  [Modals.DELETE_TASK]: DeleteTaskModal,
  [Modals.SETTINGS]: SettingsModal,
};

export function createModal(modal, props) {
  return React.createElement(ModalComponents[modal], props);
}
