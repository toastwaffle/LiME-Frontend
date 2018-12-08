import {createConstants} from '../utils';
import DeleteTaskModal from '../components/DeleteTaskModal';
import EditTagsModal from '../components/EditTagsModal';
import React from 'react';
import SettingsModal from '../components/SettingsModal';

export const Modals = createConstants('MODAL_', [
  'DELETE_TASK',
  'EDIT_TAGS',
  'SETTINGS',
]);

const ModalComponents = {
  [Modals.DELETE_TASK]: DeleteTaskModal,
  [Modals.EDIT_TAGS]: EditTagsModal,
  [Modals.SETTINGS]: SettingsModal,
};

export function createModal(modal, props) {
  return React.createElement(ModalComponents[modal], props);
}
