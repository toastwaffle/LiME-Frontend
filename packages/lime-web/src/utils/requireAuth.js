import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import React from 'react';

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentDidUpdate() {
      this.checkAuth(this.props.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/home?next=${redirectAfterLogin}`));
      }
    }

    render() {
      if (this.props.isAuthenticated === true)
        return <Component {...this.props}/>;
      return null;
    }
  }
  AuthenticatedComponent.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  function mapState(state) {
    return {
      isAuthenticated: state.auth.backend.isAuthenticated()
    };
  }

  return connect(mapState)(AuthenticatedComponent);
}
