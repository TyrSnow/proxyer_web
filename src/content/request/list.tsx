import * as React from 'react';

import RequestItem from './request';
import { Pattern } from '../../definition/proxy';

interface RequestListProps {
  list: any[]
  patterns: Pattern[]
  createRequestPattern(url: string, method: number): any
}

class RequestList extends React.Component<RequestListProps> {
  static defaultProps = {
    list: [],
  };

  static equal(val: any, target: any) {
    return val === target;
  }

  static in(val: any, target: any) {
    return val in target;
  }

  static range(val: any, target: any) {
    return (val < target[1]) && (val > target[0]);
  }

  static filterFactor(filters: any[]) {
    return (request: any) => {
      return [true].concat(filters).reduce((r, c: any) => r && RequestList[c.match](request[c.key], c.value));
    };
  }

  render() {
    console.debug('Request List render: ', this.props.list);

    return (
      <div className="m-requestlist ui-panel">
        {
          this.props.list.filter(RequestList.filterFactor([{
            key: 'method',
            value: 0,
            match: 'equal',
          }])).map(request => (
            <RequestItem
              key={request._id}
              {...request}
              createRequestPattern={this.props.createRequestPattern}
            />
          ))
        }
      </div>
    )
  }
}

export default RequestList;
