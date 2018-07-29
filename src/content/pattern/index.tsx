import * as React from 'react';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';

import actions from '../../store/actions';

import Filter from './filter';
import List from './list';

import './index.css';
import { SHOW_CREATE_PATTERN, SHOW_PATTERN_DETAIL } from '../../constant/command';
import { autobind } from '../../helper/autobind';

interface PatternContentProps {
  patterns: Immutable.List<any>
  trigger(name: string, payload?: any): any
  editPattern(pattern: any, patternId: string, proxyId?: string): any
}

@autobind
class PatternContent extends React.Component<PatternContentProps> {
  createPattern() {
    this.props.trigger(SHOW_CREATE_PATTERN);
  }

  editPattern(detail: any) {
    this.props.trigger(SHOW_PATTERN_DETAIL, detail);
  }

  togglePatternEnable(enable: boolean, patternId: string) {
    this.props.editPattern({
      enable,
    }, patternId);
  }

  render() {
    console.debug('PatternContext render: ', this.props);
    return (
      <div className="m-pattern">
        <Filter
          createPattern={this.createPattern}
        />
        <List
          patterns={this.props.patterns}
          createPattern={this.createPattern}
          editPattern={this.editPattern}
          togglePatternEnable={this.togglePatternEnable}
        />
      </div>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    patterns: state.getIn(['proxy', 'detail', 'patterns']),
  }),
  {
    trigger: actions.command.trigger,
    editPattern: actions.proxy.editPattern,
  },
)(PatternContent);
