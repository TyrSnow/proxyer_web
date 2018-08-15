import * as React from 'react';
import * as Immutable from 'immutable';

import PatternItem from './pattern';

interface RequestListProps {
  patterns: Immutable.List<Immutable.Map<string, any>>
  hosts: Immutable.List<Immutable.Map<string, any>>
  createPattern(): any
  editPattern(detail: any): any
  togglePatternEnable(pattern: any, patternId: string, proxyId?: string): any
  deletePattern(patternId: string, proxyId?: string): any
}

class RequestList extends React.Component<RequestListProps> {
  shouldComponentUpdate(nextProps: RequestListProps) {
    if (nextProps.hosts !== this.props.hosts) {
      return true;
    }
    if (nextProps.patterns !== this.props.patterns) {
      return true;
    }
    return false;
  }

  render() {
    const { patterns } = this.props;

    if (patterns.size === 0) {
      return (
        <div className="m-requestlist ui-panel">
          <div className="empty">
            <span>还没有匹配规则，立刻</span>
            <a onClick={this.props.createPattern} className="btnText">创建一个</a>
          </div>
        </div>
      );
    }
    return (
      <div className="m-requestlist">
        {
          patterns.map((pattern: any, index) => {
            const jsPattern = pattern.toJS();
            if (jsPattern.server) {
              jsPattern.servername = this.props.hosts.find((host: Immutable.Map<string, any>) => host.get('_id') === jsPattern.server).get('name');
            }
            return (
              <PatternItem
                key={index}
                {...jsPattern}
                editPattern={this.props.editPattern}
                togglePatternEnable={this.props.togglePatternEnable}
                deletePattern={this.props.deletePattern}
              />
            );
          })
        }
      </div>
    )
  }
}

export default RequestList;
