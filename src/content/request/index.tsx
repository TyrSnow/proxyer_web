import * as React from 'react';
import * as Immutable from 'immutable';
import RequestFilter from './filter';
import RequestList from './list';

import './index.css';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';
import { Pattern } from '../../definition/proxy';
import { METHOD } from '../../constant/http';
import { SHOW_CREATE_PATTERN, SHOW_REQUEST_DETAIL } from '../../constant/command';
import { PROXY_STATUS } from '../../constant/proxy';

const LOOP_TIME = 1000;

interface RequestContentProps {
  activeId: string
  requestCache: Immutable.Map<string, any>
  patterns: Pattern[]
  status: PROXY_STATUS
  fetchRequest(proxyId: string, lastModify: string): any
  trigger(command: string, payload?: any): any
}

interface RequestContentState {
  activeId?: string
  requests: any
  fetching: boolean
}

@autobind
class RequestContent extends React.Component<RequestContentProps, RequestContentState> {
  public state: RequestContentState = {
    requests: {},
    fetching: false,
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
      (nextState.requests !== this.state.requests)
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    if (this.updateLoop) {
      clearTimeout(this.updateLoop);
      delete this.updateLoop;
    }
  }

  update() {
    if (this.props.status === PROXY_STATUS.RUNNING) {
      this.setState({
        fetching: true,
      }, () => {
        this.props.fetchRequest(this.state.activeId as string, this.state.requests.lastModify).then(this.wait);
      });
    }
  }

  next() {
    if (this.props.status === PROXY_STATUS.RUNNING) {
      this.update();
    } else {
      this.wait();
    }
  }

  wait() {
    this.updateLoop = setTimeout(this.next, LOOP_TIME);
  }

  startLoopUpdate(props = this.props) {
    if (this.updateLoop) {
      clearTimeout(this.updateLoop);
    }
    this.setState({
      activeId: props.activeId,
      requests: props.requestCache.get(props.activeId) || {},
    }, () => {
      this.wait();
    });
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

  render() {
    return (
      <div className="m-request">
        <RequestFilter
          loading={this.state.fetching}
        />
        <RequestList
          list={this.state.requests.list}
          patterns={this.props.patterns}
          createRequestPattern={this.createRequestPattern}
          showRequestDetail={this.showRequestDetail}
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
    trigger: actions.command.trigger,
  }
)(RequestContent);
