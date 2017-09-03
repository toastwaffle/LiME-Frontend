import FormState from './hoc/FormState';
import PropTypes from 'prop-types';
import React from 'react';
import SettingWrapper from './SettingWrapper';
import connectSetting from '../utils/connectSetting';

class DropdownSetting extends FormState {
  render() {
    return (
      <SettingWrapper settingType='DropdownSetting' setting={this.props.setting} label={this.props.label} saved={this.state.saved}>
        <select
          id={this.props.setting}
          type={this.fieldType}
          onChange={this.handleChange().bind(this)}
          onBlur={this.saveChanges.bind(this)}
          value={this.state.value}
        >
          {
            this.props.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
      </SettingWrapper>
    );
  }
}
DropdownSetting.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setting: PropTypes.string.isRequired,
};

export default connectSetting(DropdownSetting);
