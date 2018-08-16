import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface ImageViewerProps {
  contentType: string
  content: string
}

interface ImageViewerState {
  url: string
}
@autobind
class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  static getCleanContentType(contentType: string) {
    return contentType.split(';')[0];
  }

  static getUrlOriginData(contentType: string, content: string) {
    const blob = new Blob([content], {
      type: ImageViewer.getCleanContentType(contentType),
    });
    
    return URL.createObjectURL(blob);
  }

  constructor(props: ImageViewerProps) {
    super(props);
    this.state = {
      url: ImageViewer.getUrlOriginData(props.contentType, props.content),
    };
  }

  componentWillReceiveProps(nextProps: ImageViewerProps) {
    if (nextProps.contentType && nextProps.content) {
      this.setState({
        url: ImageViewer.getUrlOriginData(nextProps.contentType, nextProps.content),
      });
    }
  }

  render() {
    return (
      <img src={this.state.url} />
    );
  }
}

export default ImageViewer;
