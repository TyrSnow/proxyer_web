import * as React from 'react';

import RequestItem from './request';
import { autobind } from '../../helper/autobind';

interface RequestListProps {
  list: any[]
  filters: any[]
  createRequestPattern(url: string, method: number): any
  showRequestDetail(detail: any): any
  showPatternDetail(patternId: string): any
}

interface RequestListState {
  filters: (request: any) => boolean
}

@autobind
class RequestList extends React.Component<RequestListProps, RequestListState> {
  static defaultProps = {
    list: [],
    filters: [],
  };

  static notExist(val: any, target: any) {
    return typeof val === 'undefined';
  }

  static equal(val: any, target: any) {
    return val === target;
  }

  static in(val: any, target: any) {
    return val in target;
  }

  static range(val: any, target: any) {
    return (val < target[1]) && (val > target[0]);
  }

  static match(val: any, target: any) {
    return val.indexOf(target) !== -1;
  }

  static filterFactor(filters: any[]) {
    const len = filters.length;
    return (request: any) => {
      for (let i = 0; i < len; i++) {
        const filter = filters[i];
        if (!RequestList[filter.match](request[filter.key], filter.value)) {
          return false;
        }
      }
      return true;
    };
  }

  public state: RequestListState = {
    filters: RequestList.filterFactor([]),
  }
  
  componentWillReceiveProps(nextProps: RequestListProps) {
    if (this.props.filters !== nextProps.filters) {
      this.setState({
        filters: RequestList.filterFactor(nextProps.filters),
      });
    }
  }

  render() {
    return (
      <div className="m-requestlist ui-panel">
        {
          this.props.list.filter(this.state.filters).map(request => (
            <RequestItem
              key={request._id}
              {...request}
              createRequestPattern={this.props.createRequestPattern}
              showRequestDetail={this.props.showRequestDetail}
              showPatternDetail={this.props.showPatternDetail}
            />
          ))
        }
      </div>
    )
  }
}

export default RequestList;
