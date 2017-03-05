import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/home?next=${redirectAfterLogin}`));
      }
    }

    render () {
      if (this.props.isAuthenticated === true)
        return <Component {...this.props}/>;
      return null;
    }
  }
  AuthenticatedComponent.propTypes = {
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired
    }).isRequired,
    dispatch: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  function mapState(state) {
    return {
      isAuthenticated: state.auth.backend.isAuthenticated()
    };
  }

  return connect(mapState)(AuthenticatedComponent);
}
