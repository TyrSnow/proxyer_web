import * as React from 'react';
import {
  Icon,
} from 'antd';

interface EmptyProps {
  tip: string
}
class Empty extends React.PureComponent<EmptyProps> {
  render() {
    return (
      <div className="m-empty">
        <Icon className="icon" type="file-unknown" />
        <p className="tip">{this.props.tip}</p>
      </div>
    );
  }
}

export default Empty;
