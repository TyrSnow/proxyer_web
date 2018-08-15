import * as React from 'react';
import {
  message,
  Tooltip,
  Icon,
} from 'antd';

import IconButton from '../../components/iconButton';
import { autobind } from '../../helper/autobind';
import { period } from '../../util/format';
import { MethodTag, StatusTag } from '../../components/tags';
import { copy } from '../../util/copy';

interface RequestItemProps {
  _id: string
  method: number
  url: string
  query?: string
  status: number
  finished: boolean
  pattern: string
  cost: number
  parent?: string
  createRequestPattern(url: string, method: number): any
  showRequestDetail(detail: any): any
  showPatternDetail(patternId: any): any
}

interface RequestItemState {
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

  showMatchedPattern() {
    this.props.showPatternDetail(this.props.pattern);
  }

  updateShareCode() {
    this.setState({
      shareCode: this.props._id,
    });
  }

  copyShareCode() {
    const shareUrl = `${location.host}/preview?shareCode=${this.props._id}`;
    copy(shareUrl).then(
      () => message.success('分享链接复制成功！'),
    ).catch(
      () => message.error('发生了一些错误'),
    );
  }

  createRequestPattern() {
    this.props.createRequestPattern(this.props.url, this.props.method);
  }

  renderQuery(query: string) {
    if (query.length < 20) {
      return <span>?{query}</span>
    }
    return (
      <Tooltip title={query}>
        <span>?{query.substr(0, 19)}…</span>
      </Tooltip>
    );
  }

  render() {
    const {
      method, url, status, finished, pattern, cost, query, parent,
    } = this.props;

    return (
      <div className="u-request f-df">
        {
          parent ? (
            <Icon type="tool" />
          ) : null
        }
        <IconButton onClick={this.copyShareCode} tip="复制分享链接" type="share-alt" />
        <div className="tags">
          <MethodTag method={method} />
          <StatusTag status={status} finished={finished} />
        </div>
        <div onClick={this.showDetail} className="path">
          <span>{url}</span>
          {
            query ? (
              this.renderQuery(query)
            ) : null
          }
        </div>
        <div className="cost">{cost ? period(cost) : '-'}</div>
        <div className="control">
          {
            pattern ? (
              <IconButton onClick={this.showMatchedPattern} tip="查看可以匹配的其他模式" type="eye" />
            ) : null
          }
          <IconButton onClick={this.createRequestPattern} tip="创建匹配模式" type="plus-circle-o" />
        </div>
      </div>
    )
  }
}

export default RequestItem;
