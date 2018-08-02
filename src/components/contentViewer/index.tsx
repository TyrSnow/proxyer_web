import * as React from 'react';
import { autobind } from '../../helper/autobind';
import JsonViewer from './jsonViewer';

import './index.css';
import FormViewer from './formViewer';

interface ContentViewerProps {
  contentType?: string
  content: string
}

@autobind
class ContentViewer extends React.Component<ContentViewerProps> {
  static isJsonContent(contentType: string) {
    return !!contentType.match(/^application\/json/);
  }

  static isFormData(contentType: string) {
    return !!contentType.match(/^application\/x-www-form-urlencoded/);
  }

  render() {
    const { contentType = '', content } = this.props;
    const contentLength = content.length;

    if (contentLength > 100000) {
      console.debug('force render: ', contentLength);
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
    
    if (ContentViewer.isJsonContent(contentType)) {
      return <JsonViewer content={content} />;
    }

    if (ContentViewer.isFormData(contentType)) {
      return <FormViewer content={content} />;
    }

    return (
      <div className="m-contentViewer">
        <p>暂未支持的格式：{contentType}</p>
        <p>{content.substr(0, 100)}...</p>
      </div>
    );
  }
}

export default ContentViewer;
