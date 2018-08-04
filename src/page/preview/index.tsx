import * as React from 'react';
import { autobind } from '../../helper/autobind';
import Empty from './empty';

import './index.css';
import { RouteProps } from 'react-router';
import { get_param } from '../../util/params';

interface PreviewPageProps extends RouteProps {

}

interface PreviewPageState {
  isErr: boolean
  errTip?: string
}

@autobind
class PreviewPage extends React.Component<PreviewPageProps, PreviewPageState> {
  public state: PreviewPageState = {
    isErr: false,
  };

  componentWillMount() {
    this.loadShareDetail();
  }

  shareError(message: string) {
    this.setState({
      isErr: true,
      errTip: message,
    });
  }

  loadShareDetail() {
    const shareCode = get_param('shareCode');
    console.debug('shareCode: ', shareCode);
    if (!shareCode) {
      this.shareError('非法的分享链接');
    }
  }

  render() {
    console.debug('PreviewPage render: ', this.props);
    if (this.state.isErr) {
      return (
        <div className="page p-preview">
          <Empty tip="分享已经被取消或失效" />
        </div>
      );
    }
    return (
      <div className="page p-preview">
        分享界面
      </div>
    );
  }
}

export default PreviewPage;
