import * as React from 'react';
import { MethodTag, StatusTag } from '../tags';
import {
  Spin,
  Tabs,
  Button,
  message,
} from 'antd';
import ObjectTable from '../objectTable';
import ContentViewer from '../contentViewer';

import './index.css';
import axios from 'axios';
import { autobind } from '../../helper/autobind';
import IconButton from '../iconButton';
import { copy } from '../../util/copy';

const { TabPane } = Tabs;

interface RequestDetailProps {
  _id: string
  loading: boolean
  method: number
  status: number
  url: string
  query: string
  params?: object
  finished: boolean
  requestContent: string
  responseContent: string
  headers: object
  responseHeaders: object
  style?: React.CSSProperties
  onSend(requestId: string): any
}

interface RequestDetailState {
  activeKey: string
}

@autobind
class RequestDetail extends React.Component<RequestDetailProps, RequestDetailState> {
  static getContentType(headers: any) {
    return headers['content-type'] || headers['Content-Type'];
  }

  public state: RequestDetailState = {
    activeKey: 'reqHeaders',
  };

  send() {
    const {
      _id,
    } = this.props;

    axios.post(`/api/request/${_id}`, {}).then((resp) => {
      this.props.onSend(resp.data.data);
    }).catch(err => message.error(err.message));
  }

  shouldBodyDisabled() {
    if (
      (this.props.requestContent) &&
      (this.props.requestContent.length > 0)
    ) {
      return false;
    }
    return true;
  }

  handleTabKeyChange(activeKey: string) {
    this.setState({
      activeKey,
    })
  }

  copyShareLink() {
    const shareUrl = `${location.host}/preview?shareCode=${this.props._id}`;
    copy(shareUrl).then(
      () => message.success('分享链接复制成功！'),
    ).catch(
      () => message.error('发生了一些错误'),
    );
  }

  render() {
    const {
      _id,
      loading,
      method,
      status,
      finished,
      url,
      params,
      requestContent,
      responseContent,
      headers = {},
      responseHeaders = {},
      style,
    } = this.props;

    console.debug('RequestDetail render: ', this.props);
    return (
      <div style={style} className="m-requestDetail">
        <div className="block info">
          <div className="line f-df">
            <div className="info">
              <span className="tags">
                <IconButton onClick={this.copyShareLink} type="share" />
                <MethodTag method={method} />
                <StatusTag status={status} finished={finished} />
              </span>
              <span className="url">{url}</span>
            </div>
            <span className="control">
              <Button onClick={this.send} type="primary">重发</Button>
            </span>
          </div>
        </div>
        {
          params ? (
            <div className="block params">
              <ObjectTable data={params} />
            </div>
          ) : null
        }
        <div className="block full">
          {
            loading ? (
              <Spin spinning={loading}><div style={{ height: '300px' }} /></Spin>
            ) : (
              <Tabs onChange={this.handleTabKeyChange} key={_id} activeKey={this.state.activeKey}>
                <TabPane key="reqHeaders" tab="Headers">
                  <ObjectTable data={headers} />
                </TabPane>
                <TabPane disabled={this.shouldBodyDisabled()} key="reqBody" tab="Body">
                  <ContentViewer
                    contentType={RequestDetail.getContentType(headers)}
                    content={requestContent}
                  />
                </TabPane>
                <TabPane key="resHeaders" tab="Response Headers">
                  <ObjectTable data={responseHeaders} />
                </TabPane>
                <TabPane key="resContent" tab="Response Content">
                  <ContentViewer
                    contentType={RequestDetail.getContentType(responseHeaders)}
                    content={responseContent}
                  />
                </TabPane>
              </Tabs>
            )
          }
        </div>
      </div>
    );
  }
}

export default RequestDetail;
