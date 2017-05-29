import React from 'react';

import DeleteTaskModal from '../components/DeleteTaskModal';
import {createConstants} from '../utils';

export const Modals = createConstants([
  'DELETE_TASK',
]);

const ModalComponents = {
  [Modals.DELETE_TASK]: DeleteTaskModal,
}

export function createModal(modal, props) {
  return React.createElement(ModalComponents[modal], props);
}
