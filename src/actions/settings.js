import {createConstants} from '../utils';
import defaultBackendErrorHandler from '../utils/defaultBackendErrorHandler';

export const SettingActions = createConstants('SETTING_ACTION_', [
  'GOT_SETTINGS',
  'SET_SETTING'
]);

export const SettingActionCreators = {
  getSettings: function() {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'get_settings', {},
        function(settings) {
          dispatch(SettingActionCreators.gotSettings(settings));
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  gotSettings: function(settings) {
    return {
      type: SettingActions.GOT_SETTINGS,
      payload: {settings}
    };
  },
  setSetting: function(key, value, markSaved) {
    return function(dispatch, getState) {
      return getState().auth.backend.request(
        'set_setting', {key, value},
        function() {
          dispatch(SettingActionCreators.setSetting_(key, value));
          markSaved();
        },
        defaultBackendErrorHandler(dispatch));
    };
  },
  setSetting_: function(key, value) {
    return {
      type: SettingActions.SET_SETTING,
      payload: {key, value}
    };
  },
};
