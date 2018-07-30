import * as React from 'react';
import {
  Icon,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { PROXY_STATUS } from '../../constant/proxy';
import { autobind } from '../../helper/autobind';
import { SHOW_PROXY_DETAIL } from '../../constant/command';

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
      this.props.syncProxyStatus(nextProps.activeId);
    }
  }

  componentWillMount() {
    this.syncInterval = setInterval(this.syncStatus, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.syncInterval);
    delete this.syncInterval;
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

  syncStatus() {
    if (this.props.activeId) {
      this.props.syncProxyStatus(this.props.activeId);
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

  renderStatus() {
    switch (this.props.status) {
      case PROXY_STATUS.STOP:
      case PROXY_STATUS.ERROR:
        return <Icon className="btnIcon" type="play-circle" onClick={this.startProxy} />;
      
      case PROXY_STATUS.RUNNING:
        return [
          <Icon key="stop" className="btnIcon" type="pause-circle-o" onClick={this.stopProxy} />,
          <Icon key="restart" className="btnIcon" type="retweet" onClick={this.restartProxy} />
        ];
      
      case PROXY_STATUS.SYNCING:
        return <Icon className="btnIcon" type="loading" />;
      
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="m-quickControl">
        {this.renderStatus()}
        <Icon onClick={this.editProxy} className="btnIcon" type="setting" />
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
