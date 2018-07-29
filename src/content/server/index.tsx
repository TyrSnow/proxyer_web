import * as React from 'react';
import {
  Button,
} from 'antd';
import * as Immutable from 'immutable';
import ServerItem from './server';

import './index.css';
import { connect } from 'react-redux';
import { Host } from '../../definition/proxy';
import actions from '../../store/actions';
import EditForm from './edit';
import FormWrapModal from '../../components/formWrapModal';
import { autobind } from '../../helper/autobind';

interface ServerContentState {
  server: any
  popVisible: boolean
  popTitle: string
  isEmpty: boolean
  disableHosts: Immutable.Iterable<number, Host>
  enableHosts: Immutable.Iterable<number, Host>
}
interface ServerContentProps {
  hosts: Immutable.List<Host>
  removeHost(hostId: string): any
  createHost(target: string, name?: string, changeOrigin?: boolean, enable?: boolean): any
  updateHostDetail(hostId: string, target: string, name?: string, changeOrigin?: boolean, enable?: boolean): any
  setActiveHost(hostId: string): any
  setHostState(hostId: string, state: boolean): any
}

@autobind
class ServerContent extends React.Component<ServerContentProps, ServerContentState> {
  constructor(props: ServerContentProps) {
    super(props);
    console.debug('ServerContent: ', this);
    this.state = Object.assign({
      popVisible: false,
      popTitle: '',
      server: {},
    }, this.getStateFromProps(props));
  }

  componentWillReceiveProps(nextProps: ServerContentProps) {
    if (nextProps.hosts !== this.props.hosts) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }

  getStateFromProps(props = this.props) {
    const disableHosts = props.hosts.filter((host: any) => host.get('disable'));
    const enableHosts = props.hosts.filter((host: any) => !host.get('disable'));

    return {
      disableHosts,
      enableHosts,
      isEmpty: props.hosts.size === 0,
    }
  }

  submit(fields: any) {
    console.debug('Will submit fields: ', fields);
    if (this.state.server && this.state.server._id) {
      return this.props.updateHostDetail(this.state.server._id, fields.target, fields.name, fields.changeOrigin, fields.enable);
    }
    return this.props.createHost(fields.target, fields.name, fields.changeOrigin, fields.enable);
  }

  hidePop() {
    this.setState({
      popVisible: false,
    });
  }

  showCreatePop() {
    this.setState({
      popVisible: true,
      popTitle: '新建',
      server: {},
    });
  }

  showEditPop(data: any) {
    this.setState({
      popVisible: true,
      popTitle: '编辑',
      server: data,
    });
  }

  render() {
    console.debug('ServerContent render: ', this.props);
    const { disableHosts, enableHosts, isEmpty } = this.state;

    return (
      <div className="m-server">
        <div className="ui-panel ui-panel_title">
          <h4 className="title">
            <span>目标服务器列表</span>
            <Button onClick={this.showCreatePop} type="primary">新建</Button>
          </h4>
          {
            isEmpty ? (
              <div className="empty">
                <span>还没有目标服务器，立刻</span>
                <a className="btnText" onClick={this.showCreatePop}>创建一个</a>
              </div>
            ) : (
              <div className="list">
                {
                  enableHosts.map((server:any, index: number) => (
                    <ServerItem
                      setHostState={this.props.setHostState}
                      setActiveHost={this.props.setActiveHost}
                      removeHost={this.props.removeHost}
                      edit={this.showEditPop}
                      index={index}
                      key={server.get('_id')}
                      data={server}
                    />
                  ))
                }
                {
                  disableHosts.map((server:any, index: number) => (
                    <ServerItem
                      setHostState={this.props.setHostState}
                      setActiveHost={this.props.setActiveHost}
                      index={index}
                      key={server.get('_id')}
                      data={server}
                    />
                  ))
                }
              </div>
            )
          }
          <FormWrapModal
            title={this.state.popTitle}
            visible={this.state.popVisible}
            onSubmit={this.submit}
            onCancel={this.hidePop}
            destroyOnClose={true}
            data={this.state.server}
          >
            <EditForm
            />
          </FormWrapModal>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    hosts: state.getIn(['proxy', 'detail', 'hosts']),
    patterns: state.getIn(['proxy', 'patterns']),
  }),
  {
    removeHost: actions.proxy.removeHost,
    createHost: actions.proxy.createHost,
    setActiveHost: actions.proxy.setActiveHost,
    setHostState: actions.proxy.setHostState,
    updateHostDetail: actions.proxy.updateHostDetail,
  }
)(ServerContent);
