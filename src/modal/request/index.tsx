import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';

import './index.css';
import { SHOW_REQUEST_DETAIL, HIDE_REQUEST_DETAIL } from '../../constant/command';
import axios from 'axios';

import RequestDetail from '../../components/RequestDetail';

interface RequestModalPayload {

}

interface RequestModalProps {
  regist(name: string, handler: any): any
  release(name: string, handler: any): any
}

interface RequestModalState {
  visible: boolean
  loading: boolean
  drag: boolean
  payload?: RequestModalPayload
  detail?: any
}

@autobind
class RequestModal extends React.Component<RequestModalProps, RequestModalState> {
  public state: RequestModalState = {
    loading: false,
    visible: false,
    drag: false,
    detail: {},
  };

  componentWillMount() {
    this.props.regist(SHOW_REQUEST_DETAIL, this.show);
    this.props.regist(HIDE_REQUEST_DETAIL, this.hide);
  }

  componentWillUnmount() {
    this.props.release(SHOW_REQUEST_DETAIL, this.show);
    this.props.release(HIDE_REQUEST_DETAIL, this.hide);
  }

  shouldRefreshData(requestId: string) {
    if (requestId !== this.state.detail._id) {
      return true;
    }
    if (!this.state.detail.finished) {
      return true;
    }
    return false;
  }

  hide() {
    this.setState({
      visible: false,
      loading: false,
      drag: false,
      payload: {},
    });
  }

  show(payload: any) {
    const shouldRefresh = this.shouldRefreshData(payload._id);
    this.setState({
      visible: true,
      loading: shouldRefresh,
      drag: false,
      detail: shouldRefresh ? payload : this.state.detail,
      payload,
    }, () => {
      if (shouldRefresh) {
        this.fetchDetail(payload._id);
      }
    });
  }

  fetchDetail(id: string) {
    axios.get(`/api/request/${id}`).then(resp => {
      if (id === this.state.detail._id) {
        this.setState({
          loading: false,
          detail: resp.data.data,
        });
      }
    });
  }

  changeRequest(detail: any) {
    console.debug('detail change: ', detail);
    this.setState({
      payload: detail,
      detail,
    });
  }

  render() {
    const { visible, detail = {}, loading } = this.state;

    return (
      <div className={`m-requestModal${visible ? ' active' : ''}`}>
        <div onClick={this.hide} className="u-mask" />
        <div
          onClick={this.hide}
          className="u-drag"
        />
        <RequestDetail
          loading={loading}
          {...detail}
          onSend={this.changeRequest}
        />
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({

  }),
  {
    regist: actions.command.regist,
    release: actions.command.release,
  }
)(RequestModal);
