import * as React from 'react';
import * as queryString from 'query-string';
import { autobind } from '../../helper/autobind';
import JsonViewer from './jsonViewer';

import './index.css';
import FormViewer from './formViewer';
import ObjectTable from '../objectTable';
import HTMLViewer from './htmlViewer';

interface ContentViewerProps {
  contentType?: string
  content: string
}

@autobind
class ContentViewer extends React.Component<ContentViewerProps> {
  static isJsonContent(contentType: string) {
    return !!contentType.match(/^application\/json/);
  }

  static isUrlEncoded(contentType: string) {
    return !!contentType.match(/^application\/x-www-form-urlencoded/);
  }

  static isFormData(contentType: string) {
    return !!contentType.match(/multipart\/form-data/);
  }

  static isHTMLContent(contentType: string) {
    return !!contentType.match(/(text\/html)/);
  }

  renderViewer() {
    const { contentType = '', content } = this.props;
    const contentLength = content.length;

    if (ContentViewer.isJsonContent(contentType)) {
      return <JsonViewer content={content} />;
    }

    if (ContentViewer.isUrlEncoded(contentType)) {
      return <ObjectTable data={queryString.parse(content)} bordered={true} />;
    }

    if (ContentViewer.isFormData(contentType)) {
      return <FormViewer content={content} contentType={contentType} />;
    }

    if (ContentViewer.isHTMLContent(contentType)) {
      return <HTMLViewer content={content} />;
    }

    if (contentLength > 100000) {
      return (
        <div
          style={{ wordBreak: 'break-all', height: '500px', overflowY: 'scroll' }}
          className="u-forceBig"
        >
          <div>正文长度过长不予显示</div>
          <div>{content.substr(0, 1000)}</div>
        </div>
      );
    }

  
    return (
      <div className="m-contentViewer">
        <p>暂未支持的格式</p>
        <p>{content.substr(0, 100)}...</p>
      </div>
    );
  }

  render() {
    const { contentType = '' } = this.props;

    return (
      <div className="m-contentViewer">
        <h3 className="title">{contentType}</h3>
        { this.renderViewer() }
      </div>
    );
  }
}

export default ContentViewer;
