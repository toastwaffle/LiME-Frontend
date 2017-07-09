import React from 'react';
import PropTypes from 'prop-types';

import {Setting, connectSetting} from './hoc/settings';
import SettingWrapper from './SettingWrapper';

class TextSetting extends Setting {
  constructor(props) {
    super(props);
    this.fieldType = props.fieldType || 'text';
  }

  render() {
    return (
      <SettingWrapper settingType='TextSetting' setting={this.props.setting} label={this.props.label} saved={this.state.saved}>
        <input
          id={this.props.setting}
          type={this.fieldType}
          value={this.state.value}
          onChange={this.handleChange('value').bind(this)}
          onBlur={this.setSetting.bind(this)}
        />
      </SettingWrapper>
    );
  }
}
TextSetting.propTypes = {
  fieldType: PropTypes.string,
  label: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
};

export default connectSetting(TextSetting);
