import Config from '../../Config';
import PropTypes from 'prop-types';
import React from 'react';

export default class FormState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      value: props.value,
      savedTimeout: null,
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
    this.saveChanges();
  }

  markSaved() {
    if (this.state.savedTimeout !== null) {
      clearTimeout(this.state.savedTimeout);
    }

    this.setState({
      saved: true,
      savedTimeout: setTimeout(
        () => this.setState({saved: false}),
        Config.savedTimeout)
    });
  }

  saveChanges() {
    if (this.state.value === this.props.value) return;
    this.props.saveValue(this.state.value, this.markSaved.bind(this));
  }
}
FormState.propTypes = {
  saveValue: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};
