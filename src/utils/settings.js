import React from 'react';
import PropTypes from 'prop-types';

import DropdownSetting from '../components/DropdownSetting';
import i18n from '../i18n';
import TextSetting from '../components/TextSetting';
import {createConstants} from '../utils';

export const SettingTypes = createConstants(
  'DROPDOWN',
  'EMAIL',
  'TEXT'
);

function EmailSetting(props) {
  return <TextSetting {...props} fieldType='email' />;
}

const SettingComponents = {
  [SettingTypes.DROPDOWN]: DropdownSetting,
  [SettingTypes.EMAIL]: EmailSetting,
  [SettingTypes.TEXT]: TextSetting,
};

// This list should be kept in sync with the settings in the backend.
export const Settings = [
  {
    setting: 'name',
    label: 'Your name',
    type: SettingTypes.TEXT,
  },
  {
    setting: 'email',
    label: 'Your email',
    type: SettingTypes.EMAIL,
  },
  {
    setting: 'deletion_behaviour',
    label: 'Behaviour when deleting tasks with children',
    type: SettingTypes.DROPDOWN,
    options: [
      {value: 'ASK', label: 'Ask every time'},
      {value: 'CASCADE', label: 'Delete children recursively'},
      {value: 'REPARENT', label: 'Move children to parent task'},
    ]
  },
  {
    setting: 'language',
    label: 'Language',
    type: SettingTypes.DROPDOWN,
    options: Object.entries(i18n).map(([lang, strings]) => ({
      value: lang,
      label: strings['_LANGUAGE']
    }))
  },
];

export function createSetting(props) {
  return React.createElement(SettingComponents[props.type], Object.assign({}, props, {key: props.setting}));
}
createSetting.propTypes = {
  type: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
};
