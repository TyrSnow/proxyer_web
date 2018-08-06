import * as React from 'react';
import axios from 'axios';
import { autobind } from '../../helper/autobind';
import Empty from './empty';

import './index.css';
import { RouteProps } from 'react-router';
import { get_param } from '../../util/params';
import RequestDetail from '../../components/RequestDetail';

interface PreviewPageProps extends RouteProps {

}

interface PreviewPageState {
  isErr: boolean
  errTip?: string
  data?: any
}

@autobind
class PreviewPage extends React.Component<PreviewPageProps, PreviewPageState> {
  public state: PreviewPageState = {
    isErr: false,
    data: {},
  };

  componentWillMount() {
    this.loadShareDetail();
  }

  componentWillReceiveProps(nextProps: PreviewPageProps) {
    if (nextProps.location && this.props.location) {
      if (nextProps.location.search !== this.props.location.search) {
        this.loadShareDetail();
      }
    }
  }

  shareError({ message }: any) {
    this.setState({
      isErr: true,
      errTip: message,
    });
  }

  updateShareDetail(resp: any) {
    this.setState({
      data: resp.data.data,
    });
    console.debug(resp);
  }

  loadShareDetail() {
    const shareCode = get_param('shareCode');
    if (!shareCode) {
      this.shareError({
        message: '非法的分享链接',
      });
      return;
    }
    axios({
      url: `/api/request/${shareCode}`,
      method: 'get',
    }).then(this.updateShareDetail).catch(this.shareError);
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
        <RequestDetail {...this.state.data} />
      </div>
    );
  }
}

export default PreviewPage;
