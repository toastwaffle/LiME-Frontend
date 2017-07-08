import {SettingActions} from '../actions/settings';
import {createReducer} from '../utils';

const initialState = {};

export default createReducer(initialState, {
  [SettingActions.GOT_SETTINGS]: (state, payload) => {
    return payload.settings;
  },
  [SettingActions.SET_SETTING]: (state, payload) => {
    return Object.assign({}, state, {[payload.key]: payload.value});
  },
});
