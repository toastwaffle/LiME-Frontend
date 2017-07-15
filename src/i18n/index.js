import {formatStr} from '../utils';
import en_gb from './en_gb';

export const languages = {
  'en_gb': en_gb
};

export default function i18n(language, key, args) {
  var mapped = (languages[language || 'en_gb'] || {})[key];

  if (mapped === undefined) return key;

  return formatStr(mapped, args);
}
