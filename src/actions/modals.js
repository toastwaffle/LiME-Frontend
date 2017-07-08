import {createConstants} from '../utils';

export const ModalActions = createConstants(
  'SHOW_MODAL',
  'CLOSE_MODAL'
);

export const ModalActionCreators = {
  showModal: function(modal, props) {
    return {
      type: ModalActions.SHOW_MODAL,
      payload: {
        modal: modal,
        props: props,
      }
    };
  },
  closeTopModal: function() {
    return {
      type: ModalActions.CLOSE_MODAL,
      payload: {
        closeTop: true,
      }
    };
  },
  closeModal: function(id) {
    return {
      type: ModalActions.CLOSE_MODAL,
      payload: {
        closeTop: false,
        id: id,
      }
    };
  }
};
