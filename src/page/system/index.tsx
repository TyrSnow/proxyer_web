import * as React from 'react';
import Head from '../../frame/head';
import SystemContent from '../../content/system';

import './index.css';

/**
 * 系统参数配置页面
 */
class SystemPage extends React.Component {
  render() {
    return (
      <div className="page p-system">
        <Head />
        <SystemContent />
      </div>
    )
  }
}

export default SystemPage;
