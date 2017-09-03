import FormState from './hoc/FormState';
import PropTypes from 'prop-types';
import React from 'react';
import SettingWrapper from './SettingWrapper';
import connectSetting from '../utils/connectSetting';

class TextSetting extends FormState {
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
          onChange={this.handleChange().bind(this)}
          onBlur={this.saveChanges.bind(this)}
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
