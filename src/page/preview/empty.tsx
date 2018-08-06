import * as React from 'react';
import {
  Icon, Input, Button,
} from 'antd';
import { autobind } from '../../helper/autobind';
import history from '../../shared/history';

interface EmptyProps {
  tip: string
}
interface EmptyState {
  shareCode: string
}
@autobind
class Empty extends React.Component<EmptyProps, EmptyState> {
  public state = {
    shareCode: '',
  };

  preview() {
    this.setState({
      shareCode: '',
    });
    history.replace(`/preview?shareCode=${this.state.shareCode}`);
  }

  onShareCodeChange(e: any) {
    this.setState({
      shareCode: e.target.value,
    });
  }

  render() {
    return (
      <div className="m-empty">
        <Icon className="icon" type="file-unknown" />
        <p className="tip">{this.props.tip}</p>
        <div className="jump">
          <Input value={this.state.shareCode} onChange={this.onShareCodeChange} placeholder="分享码" />
          <Button onClick={this.preview}>查看</Button>
        </div>
      </div>
    );
  }
}

export default Empty;
