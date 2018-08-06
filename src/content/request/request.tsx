import * as React from 'react';
import {
  Icon,
} from 'antd';
import * as Clipboard from 'clipboard';


import IconButton from '../../components/iconButton';
import { autobind } from '../../helper/autobind';
import { period } from '../../util/format';
import { MethodTag, StatusTag } from '../../components/tags';

interface RequestItemProps {
  _id: string
  method: number
  url: string
  query?: string
  status: number
  finished: boolean
  pattern: string
  cost: number
  createRequestPattern(url: string, method: number): any
  showRequestDetail(detail: any): any
}

interface RequestItemState {
  shareCode?: string
}

@autobind
class RequestItem extends React.Component<RequestItemProps, RequestItemState> {
  public state: RequestItemState = {};

  showDetail() {
    const { _id, method, status, finished, url } = this.props;
    this.props.showRequestDetail({
      _id,
      method,
      status,
      finished,
      url,
    });
  }

  updateShareCode() {
    this.setState({
      shareCode: this.props._id,
    }, () => {
      this.startCopyListen();
    });
  }

  startCopyListen() {
    const { shareCode } = this.state;
    const clipboard = new Clipboard(`.shareCode${shareCode}`);
    clipboard.on('success', (e: any) => {
      console.debug('Action:', e.action);
      console.debug('Text:', e.text);
      console.debug('Trigger:', e.trigger);
  
      e.clearSelection();
    });
 
    clipboard.on('error', (e: any) => {
      console.debug('Action:', e.action);
      console.debug('Trigger:', e.trigger);
    });
  }

  handleShareClick(e: React.MouseEvent) {
    e.nativeEvent.preventDefault();
    this.updateShareCode();
  }

  createRequestPattern() {
    this.props.createRequestPattern(this.props.url, this.props.method);
  }

  render() {
    const {
      method, url, status, finished, pattern, cost, query,
    } = this.props;
    const {
      shareCode,
    } = this.state;

    return (
      <div className="u-request f-df" onClick={this.showDetail}>
        <div className="tags">
          <MethodTag method={method} />
          <StatusTag status={status} finished={finished} />
        </div>
        <div className="path">
          <span>{url}</span>
          {
            shareCode ? (
              <span className="shareCode">
                <span className={`shareCode${shareCode}`}>{shareCode}</span>
                <IconButton tip="复制到粘贴板" type="copy" />
              </span>
            ) : (
              <IconButton onClick={this.handleShareClick} tip="生成分享码并复制到粘贴板" type="share-alt" />
            )
          }
          {
            query ? (
              <Icon type="flag" />
            ) : null
          }
        </div>
        <div className="cost">{cost ? period(cost) : '-'}</div>
        <div className="control">
          {
            pattern ? (
              <IconButton tip="查看可以匹配的其他模式" type="eye" />
            ) : null
          }
          <IconButton onClick={this.createRequestPattern} tip="创建匹配模式" type="plus-circle-o" />
        </div>
      </div>
    )
  }
}

export default RequestItem;
