import {SettingActionCreators} from '../actions/settings';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {curry} from '../utils';

function mapStateToProps(state, props) {
  return {
    value: state.settings[props.setting]
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    saveValue: curry(bindActionCreators(SettingActionCreators.setSetting, dispatch), props.setting)
  };
}

export default function connectSetting(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
