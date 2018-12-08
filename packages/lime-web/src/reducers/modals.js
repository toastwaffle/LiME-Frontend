import {ModalActions} from '../actions/modals';
import {createModal} from '../utils/modals';
import {createReducer} from '../utils';

const initialState = [];

export default createReducer(initialState, true, {
  [ModalActions.SHOW_MODAL]: (state, payload) => {
    return state.concat([createModal(payload.modal, payload.props)]);
  },
  [ModalActions.CLOSE_ALL]: () => {
    return initialState;
  },
  [ModalActions.CLOSE_TOP]: (state) => {
    return state.slice(0, -1);
  }
});
