import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { ProxyInfo } from '../../definition/proxy';
import { autobind } from '../../helper/autobind';
import ProxySelectList from './proxySelect.list';
import { SHOW_PROXY_COPY } from '../../constant/command';

interface ProxySelectProps {
  list: ProxyInfo[]
  list_loading: boolean
  active_id: string
  config: any
  setActive(activeId: string): any
  trigger(name: string, payload?: any): any
  updateSortConfig(sortList: string[]): any
}

interface ProxySelectState {
  listVisible: boolean
}

@autobind
class ProxySelect extends React.Component<ProxySelectProps, ProxySelectState> {
  public state = {
    listVisible: false,
  };

  shouldComponentUpdate(nextProps: ProxySelectProps, nextState: ProxySelectState) {
    if (nextProps.list !== this.props.list) {
      return true;
    }
    if (nextProps.active_id !== this.props.active_id) {
      return true;
    }
    if (nextProps.list_loading !== this.props.list_loading) {
      return true;
    }
    if (nextState.listVisible !== this.state.listVisible) {
      return true;
    }
    return false;
  }

  toggleListVisible() {
    this.setState((prevState) => ({
      listVisible: !prevState.listVisible,
    }));
  }

  handleProxyChange(e: any) {
    // if (e === 'create') {
    //   console.debug(e);
    //   this.props.trigger(SHOW_CREATE_PROXY);
    //   return;
    // }
    this.setState({
      listVisible: false,
    });
    this.props.setActive(e);
  }

  copyProxy(proxy: ProxyInfo) {
    const { _id, name, port } = proxy;
    this.setState({
      listVisible: false,
    });
    this.props.trigger(SHOW_PROXY_COPY, {
      title: `创建"${name}"的副本`,
      _id,
      name: `${name}-副本`,
      port: port + 1,
    })
  }

  getActiveProxy() {
    const { active_id } = this.props;
    const activeProxys = this.props.list.filter(proxy => active_id === proxy._id);
    return activeProxys[0] || {};
  }
  
  renderProxy(proxy: ProxyInfo) {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <div onClick={() => this.handleProxyChange(proxy._id)} className="u-pattern" key={proxy._id}>{proxy.name}: {proxy.port}</div>
    );
  }

  renderProxyList() {
    const { list = [], active_id, config = {} } = this.props;
    const { proxySort = [] } = config;

    return (
      <div className="u-list">
        <div onClick={this.toggleListVisible} className="u-list-mask" />
        <ProxySelectList
          list={list}
          sort={proxySort}
          active_id={active_id}
          onProxyClick={this.handleProxyChange}
          onSortChange={this.props.updateSortConfig}
          copyProxy={this.copyProxy}
        />
      </div>
    );
  }

  renderActive() {
    if (this.props.list_loading) {
      return null;
    }
    const { name, port } = this.getActiveProxy();
    return (
      <span onClick={this.toggleListVisible} className="u-active">{name}: {port}</span>
    );
  }

  render() {
    return (
      <div className={`m-proxySelect${this.state.listVisible ? ' active' : ''}`}>
        {this.renderActive()}
        {this.renderProxyList()}
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    list: state.getIn(['proxy', 'list']).toJS(),
    list_loading: state.getIn(['proxy', 'list_loading']),
    active_id: state.getIn(['proxy', 'active_id']),
    auth_state: state.getIn(['auth', 'state']),
    config: state.getIn(['auth', 'config']),
  }),
  {
    setActive: actions.proxy.setActive,
    trigger: actions.command.trigger,
    updateSortConfig: actions.auth.updateSortConfig,
  },
)(ProxySelect);
