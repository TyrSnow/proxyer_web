import * as React from 'react';
import * as Immutable from 'immutable';

import PatternItem from './pattern';

interface RequestListProps {
  patterns: Immutable.List<Immutable.Map<string, any>>
  createPattern(): any
  editPattern(detail: any): any
  togglePatternEnable(pattern: any, patternId: string, proxyId?: string): any
}

class RequestList extends React.Component<RequestListProps> {
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
          patterns.map((pattern: any, index) => (
            <PatternItem
              key={index}
              {...pattern.toJS()}
              editPattern={this.props.editPattern}
              togglePatternEnable={this.props.togglePatternEnable}
            />
          ))
        }
      </div>
    )
  }
}

export default RequestList;
