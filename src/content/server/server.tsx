import * as React from 'react';
import {
  Icon,
  Menu,
  Dropdown,
  Modal,
} from 'antd';
import { Host } from '../../definition/proxy';
import { autobind } from '../../helper/autobind';

interface ServerItemProps {
  data: any
  index: number
  removeHost?(hostId: string): any
  setActiveHost(hostId: string): any
  setHostState(hostId: string, state: boolean): any
  edit?(data: any): any
}

interface ServerItemState extends Host {
}

@autobind
class ServerItem extends React.Component<ServerItemProps, ServerItemState> {
  constructor(props: ServerItemProps) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  shouldComponentUpdate(nextProps: ServerItemProps) {
    if (nextProps.data !== this.props.data) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps: ServerItemProps) {
    if (nextProps.data !== this.props.data) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }

  getStateFromProps(props = this.props) {
    const { data } = props;
    return {
      _id: data.get('_id'),
      name: data.get('name'),
      target: data.get('target'),
      active: data.get('active'),
      disable: data.get('disable'),
      changeOrigin: data.get('changeOrigin'),
    };
  }

  getClassName(
    active: boolean = false,
    disable: boolean = false,
  ) {
    return `server${active ? ' active' : ''}${disable ? ' disable': ''}`;
  }
  
  setActive() {
    this.props.setActiveHost(this.state._id);
  }

  disable() {
    this.props.setHostState(this.state._id, false);
  }

  enable() {
    this.props.setHostState(this.state._id, true);
  }

  delete() {
    // 先获取目标服务器涉及的模式，经用户确认后删除
    Modal.confirm({
      title: '确认删除？',
      onOk: () => {
        if (this.props.removeHost) {
          this.props.removeHost(this.state._id);
        }
      }
    })
  }

  edit() {
    if (this.props.edit) {
      this.props.edit(this.state);
    }
  }

  renderSubMenus() {
    if (this.state.active) { // 默认的目标服务器不能被删除或禁用
      return (
        <Menu>
          <Menu.Item onClick={this.edit}>编辑</Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu>
        <Menu.Item onClick={this.disable}>禁用</Menu.Item>
        <Menu.Item onClick={this.edit}>编辑</Menu.Item>
        <Menu.Item onClick={this.delete}>删除</Menu.Item>
      </Menu>
    );
  }

  render() {
    console.debug('ServerItem render: ', this.state);
    const {
      name, target, active, disable,
    } = this.state;
  
    return (
      <div className={this.getClassName(active, disable)}>
        {
          disable ? null : (
            <Icon onClick={this.setActive} type="pushpin-o" />
          )
        }
        <Icon type="desktop" />
        <p className="name">{name}</p>
        <p className="target">To: {target}</p>
        {
          disable ? (
            <p>
              <span onClick={this.delete} className="btn">删除</span>
              <span className="divider" />
              <span onClick={this.enable} className="btn">启用</span>
            </p>
          ) : (
            <Dropdown placement="bottomRight" overlay={this.renderSubMenus()}>
              <Icon type="setting" />
            </Dropdown>
          )
        }
      </div>
    );
  }
}

export default ServerItem;