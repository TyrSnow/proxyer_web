import * as React from 'react';
import * as queryString from 'query-string';
import { autobind } from '../../helper/autobind';
import JsonViewer from './jsonViewer';

import './index.css';
import FormViewer from './formViewer';
import ObjectTable from '../objectTable';
import HTMLViewer from './htmlViewer';
import CopyTag from '../tags/copyTag';
// import ImageViewer from './imageViewer';

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
    return !!contentType.match(/^multipart\/form-data/);
  }

  static isHTMLContent(contentType: string) {
    return !!contentType.match(/(text\/html)/);
  }

  static isImageContent(contentType: string) {
    return !!contentType.match(/^image\//);
  }

  renderViewer() {
    const { contentType = '', content } = this.props;

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

    // if (ContentViewer.isImageContent(contentType)) {
    //   return <ImageViewer contentType={contentType} content={content} />;
    // }
  
    return (
      <div className="m-contentViewer">
        <CopyTag content={content} title="暂未支持的数据格式" />
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
