import * as React from 'react';

interface FormViewerProps {
  content: string
  contentType: string
}

interface Field {
  key: string
  type: string
  value: string
}
interface FormViewerState {
  fields: Field[]
}

class FormViewer extends React.PureComponent<FormViewerProps, FormViewerState> {
  static getBoundary(contentType: string) {
    const keyVal = contentType.match(/boundary=([^;]+)/);
    if (keyVal) {
      return keyVal[1];
    }
    return undefined;
  }

  static getFieldName(contentDisposition: string) {
    const nameMatched = contentDisposition.match(/name="([^"]+)"/);
    if (nameMatched) {
      return nameMatched[1];
    }
    return '';
  }

  static getFileName(contentDisposition: string) {
    const nameMatched = contentDisposition.match(/filename="([^"]+)"/);
    if (nameMatched) {
      return nameMatched[1];
    }
    return undefined;
  }

  static getFileContentType(lines: string[]) {
    const contentType = lines.find(line => line.indexOf('Content-Type') !== -1);
    if (contentType) {
      return contentType.replace('Content-Type:', '');
    }
    return 'File';
  }

  static getFieldValue(lines: string[]) {
    return lines.filter(line => (
      (line !== '') &&
      (!line.match(/^(--)?$/)) &&
      (line.indexOf('Content-') !== 0)
    )).join('\n');
  }

  static formatField(strField: string): Field | void {
    const lines = strField.split('\n');
    const contentDisposition = lines.find(line => line.indexOf('Content-Disposition') !== -1);
    if (contentDisposition) {
      const name = FormViewer.getFieldName(contentDisposition);
      const fileName = FormViewer.getFileName(contentDisposition);
      if (fileName) {
        return {
          key: name,
          type: FormViewer.getFileContentType(lines),
          value: fileName,
        };
      }
      
      return {
        key: name,
        type: 'Text',
        value: FormViewer.getFieldValue(lines),
      };
    } else {
      console.debug('Unparse Field: ', strField);
    }
    return undefined;
  }

  static formatFormData(content: string, contentType: string): Field[] {
    const boundary = FormViewer.getBoundary(contentType);
    if (boundary) {
      const strFields = content.split(boundary);
      return strFields
        .map((strField) => FormViewer.formatField(strField))
        .filter(field => !!field) as Field[];
    }
    return [];
  }

  constructor(props: FormViewerProps) {
    super(props);
    this.state = {
      fields: FormViewer.formatFormData(props.content, props.contentType),
    };
  }

  componentWillReceiveProps(nextProps: FormViewerProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({
        fields: FormViewer.formatFormData(nextProps.content, nextProps.contentType),
      });
    }
  }

  render() {
    const { fields } = this.state;
    return (
      <div className="m-formViewer">
      {
        fields.map(({ key, type, value }, index) => (
          <div className="line" key={`${key}-${index}`}>
            <span className="column key">{key}</span>
            <span className="column type">{type}</span>
            <span className="column value">{value}</span>
          </div>
        ))
      }
      </div>
    );
  }
}

export default FormViewer;
