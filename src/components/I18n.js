import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import i18n from '../i18n';

function isString(thing) {
  return (typeof thing === 'string' || thing instanceof String);
}

function replace(language, key) {
  return (i18n[language || 'en_gb'] || {})[key] || key;
}

function maybeReplaceProp(language, props, propName) {
  if (isString(props[propName])) {
    props[propName] = replace(language, props[propName]);
  }
}

class I18n extends React.Component {
  render() {
    const {component: Component, language: language, ...props} = this.props;

    maybeReplaceProp(language, props, 'children');
    maybeReplaceProp(language, props, 'placeholder');
    maybeReplaceProp(language, props, 'title');

    return (
      <Component {...props} />
    );
  }
}
I18n.propTypes = {
  component: PropTypes.any,
  language: PropTypes.string,
};
I18n.defaultProps = {
  component: 'span',
};

function mapStateToProps(state) {
  return {
    language: state.settings.language,
  };
}

export default connect(mapStateToProps)(I18n);
