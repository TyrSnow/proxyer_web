import * as React from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';

import actions from '../../store/actions';
import history from '../../shared/history';

import PatternContent from '../../content/pattern';
import RequestContent from '../../content/request';
import ServerContent from '../../content/server';
import SettingContent from '../../content/setting';
import { AUTH_STATE } from '../../constant/auth';
import { ProxyInfo } from '../../definition/proxy';

import Proxy from '../../modal/proxy/index';
import Pattern from '../../modal/pattern/index';
import RequestModal from '../../modal/request/index';
import Head from '../../frame/head';
import LinkSider from '../../frame/linkSider';

import './index.css';
import ApiContent from '../../content/api';

const links = [
  {
    to: '/',
    icon: 'wifi',
  }, {
    to: '/pattern',
    icon: 'filter',
  }, {
    to: '/server',
    icon: 'desktop',
  }, {
    to: '/api',
    icon: 'api',
  }, {
    to: '/setting',
    icon: 'setting',
  },
];

interface IndexPageProps {
  state: AUTH_STATE
  initial: boolean
  list: Immutable.List<ProxyInfo>
  list_initial: boolean
  proxy_detail_loading: boolean
  loadList(): any
}

class IndexPage extends React.Component<IndexPageProps> {
  componentWillMount() {
    this.checkIfRedirect();
    this.loadProxyListIfNeeded();
  }

  componentWillReceiveProps(nextProps: IndexPageProps) {
    this.checkIfRedirect(nextProps);
    this.loadProxyListIfNeeded(nextProps);
  }

  loadProxyListIfNeeded(props = this.props) {
    // 检查要不要加载列表
    if (
      (props.state === AUTH_STATE.LOGGED) &&
      (!props.list_initial)
    ) {
      this.props.loadList();
    }
  }

  checkIfRedirect(props: IndexPageProps = this.props) {
    if (props.initial) {
      return history.push('/initialize');
    }
    // if (props.list_initial && props.list.size === 0) {
    //   return history.push('/initialize');
    // }
    switch (props.state) {
      case AUTH_STATE.UNLOGED:
        return history.push('/login');
      case AUTH_STATE.INIT:
        return history.push('/loading');
    }
  }

  render() {
    console.debug('Index Page render: ', this.props);
    const { proxy_detail_loading } = this.props;
    return (
      <div className="page p-main">
        <Head />
        <div className="bottom">
          <LinkSider links={links} />
          <div className="frame-content">
            <Spin spinning={proxy_detail_loading}>
              <Switch>
                <Route path="/pattern" component={PatternContent} />
                <Route path="/setting" component={SettingContent} />
                <Route path="/server" component={ServerContent} />
                <Route path="/api" component={ApiContent} />
                <Route path="/" component={RequestContent} />
              </Switch>
              <Proxy />
              <Pattern />
              <RequestModal />
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    state: state.getIn(['auth', 'state']),
    initial: state.getIn(['auth', 'initial']),
    list: state.getIn(['proxy', 'list']),
    list_initial: state.getIn(['proxy', 'list_initial']),
    proxy_detail_loading: state.getIn(['proxy', 'detail_loading']),
  }), {
    logIn: actions.auth.solveAuth,
    loadList: actions.proxy.loadList,
  },
)(IndexPage);
