import {createConstants} from '../utils';

export const ModalActions = createConstants('MODAL_ACTION_', [
  'SHOW_MODAL',
  'CLOSE_TOP',
  'CLOSE_ALL',
]);

export const ModalActionCreators = {
  showModal: function(modal, props) {
    return {
      type: ModalActions.SHOW_MODAL,
      payload: {modal, props}
    };
  },
  closeTopModal: function() {
    return {type: ModalActions.CLOSE_TOP};
  },
  closeAllModals: function() {
    return {type: ModalActions.CLOSE_ALL};
  }
};
