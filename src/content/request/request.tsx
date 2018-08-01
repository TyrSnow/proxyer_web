import * as React from 'react';
import {
  Tag,
  Icon,
} from 'antd';
import { METHOD_COLOR, METHOD_LABEL } from '../../constant/method';
import IconButton from '../../components/iconButton';
import { autobind } from '../../helper/autobind';
import { period } from '../../util/format';

interface RequestItemProps {
  method: number
  url: string
  query?: string
  status: number
  finished: boolean
  pattern: string
  cost: number
  createRequestPattern(url: string, method: number): any
}

@autobind
class RequestItem extends React.Component<RequestItemProps> {
  createRequestPattern() {
    this.props.createRequestPattern(this.props.url, this.props.method);
  }

  getResponseColor(status: number) {
    if (status === 0) {
      return 'orange';
    } else if (status === 200) {
      return 'green';
    } else if (status === 301) {
      return 'cyan';
    }
    return 'red';
  }

  renderResponse(status: number, finished: boolean) {
    return (
      <Tag color={this.getResponseColor(status)}>
      {
        finished ? status : (
          <Icon type="sync" spin={true} />
        )
      }
      </Tag>
    );
  }

  renderMethod(method: number) {
    return (
      <Tag color={METHOD_COLOR[method]}>{METHOD_LABEL[method]}</Tag>
    )
  }

  render() {
    const {
      method, url, status, finished, pattern, cost, query,
    } = this.props;
    return (
      <div className="u-request f-df">
        <div className="tags">
          {this.renderMethod(method)}
          {this.renderResponse(status, finished)}
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
