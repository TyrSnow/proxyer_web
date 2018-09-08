import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { PROXY_STATUS } from '../../constant/proxy';
import { autobind } from '../../helper/autobind';
import { SHOW_PROXY_DETAIL, SHOW_PROXY_COPY, SHOW_CREATE_PROXY } from '../../constant/command';
import IconButton from '../iconButton';
import { Icon } from 'antd';

interface QuickControlBarProps {
  activeId: string
  status: PROXY_STATUS
  name: string
  port: string
  syncProxyStatus(proxyId?: string): any
  startProxy(proxyId?: string): any
  restartProxy(proxyId?: string): any
  stopProxy(proxyId?: string): any
  trigger(name: string, payload: any): any
}

@autobind
class QuickControlBar extends React.Component<QuickControlBarProps> {
  private syncInterval: number;

  constructor(props: QuickControlBarProps) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps: QuickControlBarProps) {
    if (nextProps.activeId !== this.props.activeId) {
      this.startSyncLoop(nextProps.activeId);
    }
  }

  componentWillMount() {
    this.startSyncLoop();
  }

  componentWillUnmount() {
    this.stopSyncLoop();
  }

  startSyncLoop(activeId?: string) {
    this.syncInterval = setInterval(this.syncStatus, 60000);
    this.syncStatus(activeId);
  }

  stopSyncLoop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      delete this.syncInterval;
    }
  }

  restartProxy() {
    this.props.restartProxy(this.props.activeId);
  }

  startProxy() {
    this.props.startProxy(this.props.activeId);
  }

  stopProxy() {
    this.props.stopProxy(this.props.activeId);
  }

  syncStatus(activeId = this.props.activeId) {
    if (activeId) {
      this.props.syncProxyStatus(activeId);
    }
  }

  editProxy() {
    const { activeId, name, port, status } = this.props;
    this.props.trigger(SHOW_PROXY_DETAIL, {
      title: '编辑',
      _id: activeId,
      name,
      port,
      status,
    });
  }

  createProxy() {
    this.props.trigger(SHOW_CREATE_PROXY, {});
  }

  copyProxy() {
    const { activeId, name, port } = this.props;
    this.props.trigger(SHOW_PROXY_COPY, {
      title: `创建"${name}"的副本`,
      _id: activeId,
      name: `${name}-副本`,
      port: port + 1,
    });
  }

  renderStatus() {
    switch (this.props.status) {
      case PROXY_STATUS.STOP:
      case PROXY_STATUS.ERROR:
        return <IconButton tip="启动代理服务器" type="start" onClick={this.startProxy} />;
      
      case PROXY_STATUS.RUNNING:
        return [
          <IconButton tip="终止代理服务器" key="stop" type="stop" onClick={this.stopProxy} />,
          <IconButton tip="重启代理服务器" key="restart" type="restart" onClick={this.restartProxy} />
        ];
      
      case PROXY_STATUS.SYNCING:
        return <Icon type="loading" />;
      
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="m-quickControl">
        {this.renderStatus()}
        <IconButton tip="设置当前代理" onClick={this.editProxy} type="setting" />
        <IconButton tip="以当前代理为模板创建新代理" onClick={this.copyProxy} type="fork" />
        <IconButton tip="创建新代理" onClick={this.createProxy} type="add" />
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    activeId: state.getIn(['proxy', 'active_id']),
    name: state.getIn(['proxy', 'detail', 'name']),
    port: state.getIn(['proxy', 'detail', 'port']),
    status: state.getIn(['proxy', 'detail', 'status']),
  }),
  {
    syncProxyStatus: actions.proxy.syncProxyStatus,
    startProxy: actions.proxy.startProxy,
    stopProxy: actions.proxy.stopProxy,
    restartProxy: actions.proxy.restartProxy,
    trigger: actions.command.trigger,
  }
)(QuickControlBar);
