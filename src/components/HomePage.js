import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import React from 'react';
import RegisterForm from './RegisterForm';
import queryString from 'query-string';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.next = queryString.parse(this.props.location.search).next || '/';
  }

  render() {
    return (
      <div className='HomePage'>
        <LoginForm next={this.next} />
        <RegisterForm next={this.next} />
      </div>
    );
  }
}
HomePage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
};
