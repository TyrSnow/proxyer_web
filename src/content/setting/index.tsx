import * as React from 'react';
import {
  Button,
  Modal,
  Icon,
  Tooltip,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';

import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';
import { PROXY_STATUS } from '../../constant/proxy';

interface SettingContentProps {
  activeId: string
  status: PROXY_STATUS
  deleteProxy(proxyId?: string): any
}

@autobind
class SettingContent extends React.Component<SettingContentProps> {
  shouldComponentUpdate(nextProps: SettingContentProps) {
    if (this.props.activeId !== nextProps.activeId) {
      return true;
    }
    if (this.props.status !== nextProps.status) {
      return true;
    }
    return false;
  }

  confirmDelele() {
    Modal.confirm({
      title: '确定删除该项目？',
      content: '删除操作是不可逆的',
      onOk: () => {
        this.props.deleteProxy(this.props.activeId);
      },
    });
  }

  proxyCanBeDelete() {
    return this.props.status === PROXY_STATUS.STOP;
  }

  renderDeleteButton() {
    if (this.proxyCanBeDelete()) {
      return (
        <Button onClick={this.confirmDelele} type="danger">删除</Button>
      );
    }
    return (
      <Tooltip placement="topLeft" title="请确认代理服务器停止运行后再进行删除" arrowPointAtCenter={true}>
        <Button disabled={true} type="danger">
          <Icon type="question-circle-o" />
          删除
        </Button>
      </Tooltip>
    );
  }

  render() {
    return (
      <div className="m-setting">
        <div className="ui-panel u-panel_title">
          <h4 className="title">项目配置</h4>
          <div className="f-df">
            <div className="line">
              {this.renderDeleteButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    activeId: state.getIn(['proxy', 'active_id']),
    status: state.getIn(['proxy', 'detail', 'status']),
  }),
  {
    deleteProxy: actions.proxy.deleteProxy,
  }
)(SettingContent);
