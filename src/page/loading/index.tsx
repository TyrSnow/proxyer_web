import * as React from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';

import actions from '../../store/actions';
import history from '../../shared/history';
import { AUTH_STATE } from '../../constant/auth';

interface LoadingPageProps {
  state: AUTH_STATE
  solveAuth(token: string): any
}

class LoadingPage extends React.Component<LoadingPageProps> {
  componentWillMount() {
    const token = localStorage.getItem('token');
    this.props.solveAuth(token as string);
  }

  componentWillReceiveProps(nextProps: LoadingPageProps) {
    console.debug('History: ', history);
    switch (nextProps.state) {
      case AUTH_STATE.LOGGED:
        if (history.length > 1) {
          return history.goBack();
        }
        return history.push('/');
      case AUTH_STATE.UNLOGED:
        return history.push('/login');
      default:
        return;
    }
  }

  render() {
    return (
      <div className="page loading">初始加载页面</div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    state: state.getIn(['auth', 'state']),
  }),
  {
    solveAuth: actions.auth.solveAuth,
  }
)(LoadingPage);
