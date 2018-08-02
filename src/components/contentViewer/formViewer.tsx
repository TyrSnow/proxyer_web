import * as React from 'react';

interface FormViewerProps {
  content: string
}

class FormViewer extends React.PureComponent<FormViewerProps> {
  static formatFormData(content: string) {
    return content;
  }

  render() {
    return (
      <div>{this.props.content}</div>
    );
  }
}

export default FormViewer;
