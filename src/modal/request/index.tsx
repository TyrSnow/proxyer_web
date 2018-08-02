import * as React from 'react';
import {
  Tabs, Spin,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';

import './index.css';
import { SHOW_REQUEST_DETAIL, HIDE_REQUEST_DETAIL } from '../../constant/command';
import axios from 'axios';
import ObjectTable from '../../components/objectTable';
import ContentViewer from '../../components/contentViewer';
import { MethodTag, StatusTag } from '../../components/tags';

const { TabPane } = Tabs;

interface RequestModalPayload {

}

interface RequestModalProps {
  regist(name: string, handler: any): any
  release(name: string, handler: any): any
}

interface RequestModalState {
  visible: boolean
  loading: boolean
  payload?: RequestModalPayload
  detail?: any
}

@autobind
class RequestModal extends React.Component<RequestModalProps, RequestModalState> {
  static getContentType(headers: any) {
    return headers['content-type'] || headers['Content-Type'];
  }

  public state: RequestModalState = {
    loading: false,
    visible: false,
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

  hide() {
    this.setState({
      visible: false,
      payload: {},
    });
  }

  show(payload: any) {
    this.setState({
      visible: true,
      loading: true,
      detail: payload,
      payload,
    }, () => {
      this.fetchDetail(payload._id);
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

  render() {
    const { visible, detail = {}, loading } = this.state;
    const {
      method,
      status,
      finished,
      requestContent,
      responseContent,
      headers = {},
      responseHeaders = {},
    } = detail;

    return (
      <div className={`m-requestModal${visible ? ' active' : ''}`}>
        <div onClick={this.hide} className="u-mask" />
        <div className="u-inner">
          <div className="block">
            <div className="line">
              <span className="tags">
                <MethodTag method={method} />
                <StatusTag status={status} finished={finished} />
              </span>
              <span className="url">{detail.url}</span>
            </div>
          </div>
          <div className="block full">
            {
              loading ? (
                <Spin spinning={loading}><div style={{ height: '300px' }} /></Spin>
              ) : (
                <Tabs>
                  <TabPane key="reqHeaders" tab="Request Headers">
                    <ObjectTable data={headers} />
                  </TabPane>
                  <TabPane key="reqBody" tab="Request Body">
                    <ContentViewer
                      contentType={RequestModal.getContentType(headers)}
                      content={requestContent}
                    />
                  </TabPane>
                  <TabPane key="resHeaders" tab="Response Headers">
                    <ObjectTable data={responseHeaders} />
                  </TabPane>
                  <TabPane key="resContent" tab="Response Content">
                    <ContentViewer
                      contentType={RequestModal.getContentType(responseHeaders)}
                      content={responseContent}
                    />
                  </TabPane>
                </Tabs>
              )
            }
          </div>
        </div>
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
