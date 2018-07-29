import * as React from 'react';
import {
  Tag,
  Icon,
} from 'antd';

const METHOD_COLOR = {
  GET: 'magenta',
  POST: 'red',
  PUT: 'volcano',
  PATCH: 'orange',
  DELETE: 'gold',
  COPY: 'lime',
  HEAD: 'green',
  OPTIONS: 'cyan',
  LINK: 'blue',
  UNLINK: 'geekblue',
  PURGE: 'purple',
  LOCK: 'red',
  UNLOCK: 'red',
  PROPFIND: 'red',
  VIEW: 'magenta',
};

interface RequestItemProps {
  method: string;
  response: number;
  path: string;
  hit: boolean;
  log: boolean;
  cost: number;
}

class RequestItem extends React.Component<RequestItemProps> {
  getResponseColor(response: number) {
    if (response === 0) {
      return 'orange';
    } else if (response === 200) {
      return 'green';
    } else if (response === 301) {
      return 'cyan';
    }
    return 'red';
  }

  getResponseText(response: number) {
    if (response === 0) {
      return <Icon type="sync" spin={true} />
    }
    return response;
  }

  renderResponse(response: number) {
    return (
      <Tag color={this.getResponseColor(response)}>{this.getResponseText(response)}</Tag>
    );
  }

  renderMethod(method: string) {
    return (
      <Tag color={METHOD_COLOR[method]}>{method}</Tag>
    )
  }
  render() {
    const {
      method, response, path, hit, log, cost,
    } = this.props;
    return (
      <div className="u-request f-df">
        <div className="tags">
          {this.renderMethod(method)}
          {this.renderResponse(response)}
        </div>
        <div className="path">
          <span>{path}</span>
          {
            hit ? (
              <Icon type="flag" />
            ) : null
          }
          {
            log ? (
              <Icon type="profile" />
            ) : null
          }
        </div>
        <div className="cost">{cost}ms</div>
        <div className="control">
          {
            hit ? (
              <Icon type="plus" />
            ) :null
          }
        </div>
      </div>
    )
  }
}

export default RequestItem;
