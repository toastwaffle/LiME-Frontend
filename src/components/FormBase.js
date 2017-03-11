import React from 'react';

export default class FormBase extends React.Component {
  handleChange(field) {
    return function(event) { this.setState({[field]: event.target.value}); };
  }
}
