import * as React from 'react';
import { Button } from 'antd';

interface ControlProps {
  analysis(): any
}

class Control extends React.Component<ControlProps> {
  render() {
    return (
      <div className="ui-panel u-control">
        <div className="filt">筛选在这里</div>
        <div className="btns">
          <Button onClick={this.props.analysis}>分析日志</Button>
        </div>
      </div>
    );
  }
}

export default Control;
