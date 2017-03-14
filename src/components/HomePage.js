import React from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.props.location.query.next || '/';
  }

  render () {
    return (
      <div className='HomePage'>
        <LoginForm next={this.next} />
        <RegisterForm next={this.next} />
      </div>
    );
  }
}
HomePage.propTypes = {
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      next: React.PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
