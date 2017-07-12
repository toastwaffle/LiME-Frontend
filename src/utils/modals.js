import {createConstants} from '../utils';
import DeleteTaskModal from '../components/DeleteTaskModal';
import React from 'react';
import SettingsModal from '../components/SettingsModal';

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
