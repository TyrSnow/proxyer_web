import * as React from 'react';
import {
  Icon,
} from 'antd';
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

@autobind
class RequestItem extends React.Component<RequestItemProps> {
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

  createRequestPattern() {
    this.props.createRequestPattern(this.props.url, this.props.method);
  }

  render() {
    const {
      method, url, status, finished, pattern, cost, query,
    } = this.props;
    return (
      <div className="u-request f-df" onClick={this.showDetail}>
        <div className="tags">
          <MethodTag method={method} />
          <StatusTag status={status} finished={finished} />
        </div>
        <div className="path">
          <span>{url}</span>
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
