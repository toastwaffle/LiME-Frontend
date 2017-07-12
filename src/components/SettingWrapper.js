import '../styles/SettingWrapper.css';
import PropTypes from 'prop-types';
import React from 'react';

export default class SettingWrapper extends React.Component {
  render() {
    return (
      <div className={'SettingWrapper ' + this.props.settingType}>
        <label htmlFor={this.props.setting}>
          {this.props.label}
          {
            this.props.saved
              ? <span className='saved'>✓ Saved!</span>
              : null
          }
        </label>
        {this.props.children}
      </div>
    );
  }
}
SettingWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  saved: PropTypes.bool.isRequired,
  setting: PropTypes.string.isRequired,
  settingType: PropTypes.string.isRequired,
};
