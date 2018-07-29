import * as React from 'react';
import {
  Switch,
  Button,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';

interface SettingContentProps {
  port: number
}
class SettingContent extends React.Component<SettingContentProps> {
  render() {
    const { props} = this;
    return (
      <div className="m-setting">
        <div className="ui-panel u-panel_title">
          <h4 className="title">运行参数</h4>
          <div className="f-df">
            <div className="line line_half">
              <Switch />
              <span className="label">超时停机</span>
            </div>
            <div className="line line_half">端口号：{props.port}</div>
          </div>
        </div>
        <div className="ui-panel u-panel_title">
          <h4 className="title">项目配置</h4>
          <div className="f-df">
            <div className="line line_half">
              <Switch />
              <span className="label">自由配置</span>
            </div>
            <div className="line">
              <Button type="danger">删除</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    port: state.getIn(['proxy', 'detail', 'port']),
  }),
)(SettingContent);
