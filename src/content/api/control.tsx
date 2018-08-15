import * as React from 'react';
import { Button } from 'antd';

class Control extends React.Component {
  render() {
    return (
      <div className="ui-panel u-control">
        <div className="filt">筛选在这里</div>
        <div className="btns">
          <Button>分析日志</Button>
        </div>
      </div>
    );
  }
}

export default Control;
