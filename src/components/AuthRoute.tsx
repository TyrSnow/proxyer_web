import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';
import * as Immutable from 'immutable';
import { AUTH_TYPE, AUTH_STATE } from '../constant/auth';
import { connect } from 'react-redux';

interface AuthRouteProps extends RouteProps {
  auth?: AUTH_TYPE
  state: AUTH_STATE
  user_auth: AUTH_TYPE
}

class AuthRoute extends React.Component<AuthRouteProps> {
  render() {
    console.debug('AuthRoute render: ', this.props.path);
    const { auth = AUTH_TYPE.USER, state, user_auth, ...other } = this.props;
    if (state === AUTH_STATE.LOGGED) {
      return (
        <Route {...other} />
      )
    }
    return (
      <Redirect to="/loading" />
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    state: state.getIn(['auth', 'state']),
    user_auth: state.getIn(['auth', 'auth']),
  }), {
  },
)(AuthRoute);
