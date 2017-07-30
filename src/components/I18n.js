import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import i18n from '../i18n';

function isString(thing) {
  return (typeof thing === 'string' || thing instanceof String);
}

function maybeReplaceProp(language, props, propName, argsPropName) {
  argsPropName = argsPropName || propName + 'I18nArgs';
  if (isString(props[propName])) {
    props[propName] = i18n(
      language,
      props[propName],
      props[argsPropName] || {}
    );
  }
  delete props[argsPropName];
}

class I18n extends React.Component {
  render() {
    const {component: Component, language, ...props} = this.props;

    maybeReplaceProp(language, props, 'children', 'contentI18nArgs');
    maybeReplaceProp(language, props, 'placeholder');
    maybeReplaceProp(language, props, 'title');

    if (props.childRef !== undefined) {
      props.ref = props.childRef;
      delete props.childRef;
    }

    delete props.dispatch;

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
