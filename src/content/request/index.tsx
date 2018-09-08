import * as React from 'react';
import * as Immutable from 'immutable';
import RequestFilter from './filter';
import RequestList from './list';

import './index.css';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';
import { METHOD } from '../../constant/http';
import { SHOW_CREATE_PATTERN, SHOW_REQUEST_DETAIL, SHOW_PATTERN_DETAIL } from '../../constant/command';
import { PROXY_STATUS } from '../../constant/proxy';
import { convertToFormFields } from '../../util/convertToFormFields';
import { message } from 'antd';

const LOOP_TIME = 1500;

interface RequestContentProps {
  activeId: string
  requestCache: Immutable.Map<string, any>
  patterns: Immutable.List<Immutable.Map<string, any>>
  status: PROXY_STATUS
  fetchRequest(proxyId: string, lastModify?: string): any
  clearRequest(proxyId: string): any
  trigger(command: string, payload?: any): any
}

interface RequestContentState {
  activeId?: string
  requests: any
  fetching: boolean
  filters: any[]
}

@autobind
class RequestContent extends React.Component<RequestContentProps, RequestContentState> {
  public state: RequestContentState = {
    requests: {},
    fetching: false,
    filters: [],
  };

  private updateLoop?: number;
  componentWillReceiveProps(nextProps: RequestContentProps) {
    if (nextProps.activeId !== this.props.activeId) {
      this.startLoopUpdate(nextProps);
    }
    if (nextProps.requestCache !== this.props.requestCache) {
      this.setState({
        requests: nextProps.requestCache.get(nextProps.activeId) || {},
      });
    }
  }

  componentWillMount() {
    if (this.props.activeId) {
      this.startLoopUpdate();
    }
  }

  shouldComponentUpdate(nextProps: RequestContentProps, nextState: RequestContentState) {
    if (
      (nextProps.requestCache !== this.props.requestCache) ||
      (nextProps.activeId !== this.props.activeId) ||
      (nextState.activeId !== this.state.activeId) ||
      (nextState.requests !== this.state.requests) ||
      (nextState.filters !== this.state.filters)
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.stopLoopUpdate();
  }

  update() {
    if (this.props.status === PROXY_STATUS.RUNNING) {
      this.props.fetchRequest(this.state.activeId as string).then(this.wait).catch(this.errorWait);
    }
  }

  next() {
    if (this.props.status === PROXY_STATUS.RUNNING) {
      this.update();
    } else {
      this.wait();
    }
  }

  errorWait(err: any) {
    console.debug('fetch err: ', err);
    this.wait();
  }

  wait() {
    this.updateLoop = setTimeout(this.next, LOOP_TIME);
  }

  startLoopUpdate(props = this.props) {
    if (this.updateLoop) {
      clearTimeout(this.updateLoop);
    }
    this.setState({
      fetching: true,
      activeId: props.activeId,
      requests: props.requestCache.get(props.activeId) || {},
    }, () => {
      this.wait();
    });
  }

  stopLoopUpdate() {
    if (this.updateLoop) {
      clearTimeout(this.updateLoop);
      delete this.updateLoop;
    }
    this.setState({
      fetching: false,
    });
  }

  showPatternDetail(patternId: string) {
    const pattern = this.props.patterns.find(p => {
      return !!p && p.get('_id') === patternId;
    });

    if (pattern) {
      this.props.trigger(
        SHOW_PATTERN_DETAIL,
        convertToFormFields(pattern.toJS()),
      );
    } else {
      console.debug('匹配模式已经不存在: ', patternId, this.props.patterns);
      message.error('匹配模式已经不存在!');
    }
  }

  showRequestDetail(detail: any) {
    this.props.trigger(SHOW_REQUEST_DETAIL, detail);
  }

  createRequestPattern(url: string, method: METHOD) {
    this.props.trigger(SHOW_CREATE_PATTERN, {
      match: url.split('?')[0],
      allow_methods: [method.toString()],
    });
  }

  handleFilterChange(filters: any[]) {
    console.debug('filter will change: ', filters);
    this.setState({
      filters,
    });
  }

  clearList() {
    this.props.clearRequest(this.state.activeId as string);
  }

  render() {
    return (
      <div className="m-request">
        <RequestFilter
          loading={this.state.fetching}
          onChange={this.handleFilterChange}
          onClear={this.clearList}
        />
        <RequestList
          list={this.state.requests.list}
          filters={this.state.filters}
          createRequestPattern={this.createRequestPattern}
          showRequestDetail={this.showRequestDetail}
          showPatternDetail={this.showPatternDetail}
        />
      </div>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    activeId: state.getIn(['proxy', 'active_id']),
    patterns: state.getIn(['proxy', 'detail', 'patterns']),
    status: state.getIn(['proxy', 'detail', 'status']),
    requestCache: state.getIn(['request']),
  }),
  {
    fetchRequest: actions.request.fetchRequest,
    clearRequest: actions.request.clearRequest,
    trigger: actions.command.trigger,
  }
)(RequestContent);
