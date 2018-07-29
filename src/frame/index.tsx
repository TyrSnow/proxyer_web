import * as React from 'react';
import {
  Spin,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';

import './index.css';

import Head from './head';
import Sider from './sider';

interface MainFrameProps {
  proxy_detail_loading: boolean
}

class MainFrame extends React.Component<MainFrameProps> {
  render() {
    const { proxy_detail_loading } = this.props;
    return (
      <div className="page p-main">
        <Head />
        <Sider />
        <div className="frame-content">
          <Spin spinning={proxy_detail_loading}>
            {this.props.children}
          </Spin>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    proxy_detail_loading: state.getIn(['proxy', 'detail_loading']),
  }),
)(MainFrame);