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
        return <Component {...this.props}/>
      return null
    }
  }

  function mapState(state) {
    return {
      token: state.auth.token,
      isAuthenticated: state.auth.token !== null
    };
  }

  return connect(mapState)(AuthenticatedComponent);
}
