import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface HTMLViewerProps {
  content: string
}

interface HTMLViewerState {
  preview: boolean
}

@autobind
class HTMLViewer extends React.Component<HTMLViewerProps, HTMLViewerState> {
  static formatPreviewStyle(node: HTMLStyleElement) {
    const styleText = node.innerHTML;
    // 添加.preview选择器控制住范围
    const styles = styleText.split('}');

    return styles
      .map(style => style.replace(/^[\n\r]*/, ''))
      .map(style => `.preview ${style}`)
      .join('}');
  }

  static formatPreviewNode(node: HTMLDivElement) {
    const styles = node.querySelectorAll('style');
    const styleCount = styles.length;
    for (let i = 0; i < styleCount; i++) {
      styles[i].innerHTML = HTMLViewer.formatPreviewStyle(styles[i]);
    }
  }
  static formatHtml(content: string) {
    const node = document.createElement('div');
    node.innerHTML = content;
    HTMLViewer.formatPreviewNode(node);

    return node.innerHTML;
  }

  public state: HTMLViewerState = {
    preview: true,
  };

  render() {
    const { preview } = this.state;
    return (
      <div className="m-htmlViewer">
      {
        preview ? (
          <div className="preview" dangerouslySetInnerHTML={{ __html: HTMLViewer.formatHtml(this.props.content) }} />
        ) : (
          <div className="origin">{this.props.content}</div>
        )
      }
      </div>
    );
  }
}

export default HTMLViewer;
