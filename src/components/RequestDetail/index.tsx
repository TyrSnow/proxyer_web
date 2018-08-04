import * as React from 'react';
import { MethodTag, StatusTag } from '../tags';
import {
  Spin,
  Tabs,
} from 'antd';
import ObjectTable from '../objectTable';
import ContentViewer from '../contentViewer';

import './index.css';

const { TabPane } = Tabs;

interface RequestDetailProps {
  loading: boolean
  method: number
  status: number
  url: string
  finished: boolean
  requestContent: string
  responseContent: string
  headers: object
  responseHeaders: object
  style?: React.CSSProperties
}

class RequestDetail extends React.Component<RequestDetailProps> {
  static getContentType(headers: any) {
    return headers['content-type'] || headers['Content-Type'];
  }

  render() {
    const {
      loading,
      method,
      status,
      finished,
      url,
      requestContent,
      responseContent,
      headers = {},
      responseHeaders = {},
      style,
    } = this.props;

    return (
      <div style={style} className="m-requestDetail">
        <div className="block">
          <div className="line">
            <span className="tags">
              <MethodTag method={method} />
              <StatusTag status={status} finished={finished} />
            </span>
            <span className="url">{url}</span>
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
