import * as React from 'react';
import {
  Tag,
  message,
} from 'antd';

import { autobind } from '../../helper/autobind';
import { copy } from '../../util/copy';

function copyBigString(text: string) {
  copy(text).then(
    () => message.success('没有显示的文本已经复制到剪贴板'),
  ).catch(
    (msg: string) => message.error(msg),
  );
}

function formatString(str: string) {
  if (str.length > 200) {
    // tslint:disable-next-line:jsx-no-lambda
    return <Tag onClick={() => copyBigString(str)} color="cyan">Big String</Tag>;
  }
  return str.replace('"', '\\"');
}

function stringify(data: any) {
  if (data === null) {
    return 'null,';
  } else if (typeof data === 'undefined') {
    return 'undefined,';
  }
  const stringData = data.toString();
  if (stringData.length > 200) {
    return <Tag color="orange">Big {typeof data}</Tag>
  }
  return stringData;
}

interface JsonViewerProps {
  content: string
}

interface JsonViewerState {
  json: object
}

@autobind
class JsonViewer extends React.Component<JsonViewerProps, JsonViewerState> {
  static jsonParse(content: string) {
    try {
      return JSON.parse(content);
    } catch (e) {
      return e;
    }
  }

  constructor(props: JsonViewerProps) {
    super(props);
    this.state = {
      json: JsonViewer.jsonParse(props.content),
    };
  }

  shouldComponentUpdate(nextProps: JsonViewerProps, nextState: JsonViewerState) {
    if (
      (nextProps.content !== this.props.content) ||
      (nextState.json !== this.state.json)
    ) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps: JsonViewerProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({
        json: JsonViewer.jsonParse(nextProps.content),
      });
    }
  }

  renderObject(data: object): any {
    const children = [];
    let i = 0;
    for (const key in data) {
      if (typeof data[key] === 'function') {
        continue;
      }
      i += 1;
      if (data[key] instanceof Object) {
        if (data[key] instanceof Array) {
          children.push((
            <div className="attr array" key={i}>
              <span className="key">{`"${key}"`}</span>: [
              {this.renderArray(data[key])}
              <p className="end">]</p>
            </div>
          ));
        } else {
          children.push((
            <div className="attr object" key={i}>
              <span className="key">{`"${key}"`}</span>: {'{'}
              {this.renderObject(data[key])}
              <p className="end">{'}'}</p>
            </div>
          ));
        }
      } else { // 基础数据类型
        const type = typeof data[key];
        children.push((
          <div
            className={`attr ${type}`}
            key={i}
          >
            <span className="key">{`"${key}"`}</span>: <span className="value">{type === 'string' ? formatString(data[key]) : stringify(data[key])}</span>
          </div>
        ));
      }
    }
    return (
      <div className="objectInner attrs">
        {children}
      </div>
    );
  }

  renderArrayItem(val: any, i: number): any {
    if (val instanceof Object) {
      if (val instanceof Array) {
        return (
          <div key={i} className="array">[
            {this.renderArray(val)}
            <p className="end">]</p>
          </div>
        );
      }
      return (
        <div key={i} className="object">{'{'}
          {this.renderObject(val)}
          <p className="end">{'}'}</p>
        </div>
      );
    }
    const type = typeof val;
    return <div key={i} className={`attr ${type}`}><span className="value">{type === 'string' ? formatString(val) : stringify(val)}</span></div>;
  }

  renderArray(data: any[]) {
    return (
      <div className="arrayInner attrs">
        {
          data.map((val, i) => this.renderArrayItem(val, i))
        }
      </div>
    );
  }

  render() {
    console.debug('JSONViewer render');
    if (this.state.json instanceof Array) {
      return (
        <div className="m-jsonViewer">
          <span className="start">[</span>
          {
            this.renderArray(this.state.json)
          }
          <span className="start">]</span>
        </div>
      );
    }
    return (
      <div className="m-jsonViewer">
        <span className="start">{'{'}</span>
        {
          this.renderObject(this.state.json)
        }
        <span className="start">{'}'}</span>
      </div>
    );
  }
}

export default JsonViewer;
