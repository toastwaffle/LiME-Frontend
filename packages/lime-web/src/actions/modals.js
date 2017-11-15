import {createConstants} from '../utils';

export const ModalActions = createConstants('MODAL_ACTION_', [
  'SHOW_MODAL',
  'CLOSE_MODAL'
]);

export const ModalActionCreators = {
  showModal: function(modal, props) {
    return {
      type: ModalActions.SHOW_MODAL,
      payload: {modal, props}
    };
  },
  closeTopModal: function() {
    return {
      type: ModalActions.CLOSE_MODAL,
      payload: {closeTop: true}
    };
  },
  closeModal: function(id) {
    return {
      type: ModalActions.CLOSE_MODAL,
      payload: {closeTop: false, id}
    };
  }
};
