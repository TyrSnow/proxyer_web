import * as React from 'react';
import {
  Select,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { ProxyInfo } from '../../definition/proxy';
import { autobind } from '../../helper/autobind';
import { SHOW_CREATE_PROXY } from '../../constant/command';

const { Option } = Select;

interface ProxySelectProps {
  list: ProxyInfo[]
  list_loading: boolean
  active_id: string
  setActive(activeId: string): any
  trigger(name: string, payload?: any): any
}

@autobind
class ProxySelect extends React.Component<ProxySelectProps> {
  shouldComponentUpdate(nextProps: ProxySelectProps) {
    if (nextProps.list !== this.props.list) {
      return true;
    }
    if (nextProps.active_id !== this.props.active_id) {
      return true;
    }if (nextProps.list_loading !== this.props.list_loading) {
      return true;
    }
    return false;
  }
  handleProxyChange(e: any) {
    if (e === 'create') {
      console.debug(e);
      this.props.trigger(SHOW_CREATE_PROXY);
      return;
    }
    this.props.setActive(e);
  }

  renderProxyList() {
    const { list = [] } = this.props;
    return list.map((proxy) => {
      return (
        <Option key={proxy._id} value={proxy._id}>{proxy.name}: {proxy.port}</Option>
      );
    });
  }

  render() {
    console.debug('ProxySelect render: ', this.props);
    return (
      <div className="m-proxySelect">
        <Select
          onChange={this.handleProxyChange}
          value={this.props.active_id}
          style={{ width: 200, marginRight: 15 }}
        >
          <Option key="create" value="create">-- 新建 --</Option>
          {this.renderProxyList()}
        </Select>
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
  }),
  {
    setActive: actions.proxy.setActive,
    trigger: actions.command.trigger,
  },
)(ProxySelect);
