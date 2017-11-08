import {ModalActions} from '../actions/modals';
import {createModal} from '../utils/modals';
import {createReducer,createUuid4} from '../utils';

const initialState = [];

export default createReducer(initialState, true, {
  [ModalActions.SHOW_MODAL]: (state, payload) => {
    var id = createUuid4();
    return state.concat([
      {
        id,
        component: createModal(payload.modal, Object.assign(payload.props, {id})),
      }
    ]);
  },
  [ModalActions.CLOSE_MODAL]: (state, payload) => {
    if (payload.closeTop) {
      return state.slice(0, -1);
    } else {
      return state.filter(modal => modal.id !== payload.id);
    }
  }
});
