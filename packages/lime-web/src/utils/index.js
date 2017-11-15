import I18n from '../components/I18n';
import PropTypes from 'prop-types';
import React from 'react';
import ReactSVG from 'react-svg';

export const logoutAction = '__LOGOUT';

export function createReducer(initialState, clearOnLogout, reducerMap) {
  return (state = initialState, action) => {
    if (action.type === logoutAction) {
      return clearOnLogout ? initialState : state;
    }

    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function createConstants(prefix, constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = prefix + constant;
    return acc;
  }, {});
}

export function createUuid4() {
  var fourHexits =
      () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return (
    fourHexits() + fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + '-' +
    fourHexits() + fourHexits() + fourHexits()
  );
}

export function filterObject(obj, ...keysToRemove) {
  var copy = Object.assign({}, obj);
  for (var i = keysToRemove.length - 1; i >= 0; i--) {
    delete copy[keysToRemove[i]];
  }
  return copy;
}

export function formatStr(str, args) {
  for (var key in args) {
    str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
  }
  return str;
}

export function toggleState(key) {
  return function() {
    this.setState((prevState) => {
      return {[key]: !prevState[key]};
    });
  };
}

export function handleChange(field) {
  return function(event) {
    this.setState({[field]: event.target.value});
  };
}

export function withTitle(Icon) {
  var style = {
    verticalAlign: 'initial',
    width: '100%',
    height: '100%',
  };
  var component = props => (
    <I18n component='span' {...props}>
      <Icon style={style} />
    </I18n>
  );
  component.displayName = 'withTitle(' + Icon.displayName + ')';
  return component;
}

export function withArgs(func, ...args) {
  return function() {
    func(...args);
  };
}

export function loadSVG(path) {
  var component = function(props) {
    var callback = null;
    if (props.onClick !== undefined) {
      callback = function(element) {
        element.onclick = props.onClick;
      };
    }
    return (
      <ReactSVG path={path} callback={callback} {...props} />
    );
  };
  component.displayName = 'SVG(' + path + ')';
  component.propTypes = {
    onClick: PropTypes.func,
  };
  return component;
}

export function preventParentScroll(target) {
  if (target === null) return;

  target.onwheel = function(event) {
    if (
      (event.deltaY < 0 && target.scrollTop === 0) ||
      (event.deltaY > 0 && target.scrollTop === (target.scrollHeight - target.offsetHeight))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
}
