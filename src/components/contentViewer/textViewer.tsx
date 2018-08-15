import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface TextViewerProps {
  content: string
}

@autobind
class TextViewer extends React.Component<TextViewerProps> {
  render() {
    return (
      <div className="m-textViewer">{this.props.content}</div>
    );
  }
}

export default TextViewer;
