import {SettingActionCreators} from '../actions/settings';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

function mapStateToProps(state, props) {
  return {
    value: state.settings[props.setting]
  };
}

function mapDispatchToProps(dispatch, props) {
  const setSetting = bindActionCreators(SettingActionCreators.setSetting, dispatch);
  return {
    saveValue: function (value, markSaved) { setSetting(props.setting, value, markSaved); }
  };
}

export default function connectSetting(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
