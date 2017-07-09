import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SettingActionCreators} from '../../actions/settings';

export class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      value: props.value,
    };
  }

  handleChange() {
    return function(event) {
      this.setState({
        saved: false,
        value: event.target.value,
      });
    };
  }

  componentWillUnmount() {
    this.setSetting();
  }

  markSaved() {
    this.setState({saved: true});
  }

  setSetting() {
    if (this.state.value === this.props.value) return;
    this.props.actions.setSetting(
      this.props.setting,
      this.state.value,
      this.markSaved.bind(this)
    );
  }
}
Setting.propTypes = {
  actions: PropTypes.object.isRequired,
  setting: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

function mapStateToProps(state, props) {
  return {
    value: state.settings[props.setting]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SettingActionCreators, dispatch)
  };
}

export function connectSetting(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
