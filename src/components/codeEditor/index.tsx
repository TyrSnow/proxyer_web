import * as React from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import { autobind } from '../../helper/autobind';

import './formatting.js';
import './index.css';

interface CodeEditorProps {
  value?: string
  onChange?(value: string): any
}

@autobind
class CodeEditor extends React.Component<CodeEditorProps> {
  private dom: HTMLDivElement
  private codeMirrorInstance: any
  private lastValue?: string

  componentWillReceiveProps(nextProps: CodeEditorProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.value !== this.lastValue) {
        this.lastValue = nextProps.value;
        this.codeMirrorInstance.setValue(this.lastValue);
      }
    }
  }

  updateValue(instance: any) {
    if (this.props.onChange) {
      this.lastValue = instance.getValue();
      this.props.onChange(this.lastValue as string);
    }
  }

  updateRef(dom: HTMLDivElement) {
    this.dom = dom;
    this.codeMirrorInstance = CodeMirror(this.dom, {
      value: this.props.value,
      lineNumbers: true,
      tabSize: 2,
      mode: {
        name: 'javascript',
        json: true,
      },
    });
    
    // CodeMirror.selectAll(editor);
    
    // function getSelectedRange() {
    //   return { from: editor.getCursor(true), to: editor.getCursor(false) };
    // }
    
    // function autoFormatSelection() {
    //   var range = getSelectedRange();
    //   editor.autoFormatRange(range.from, range.to);
    // }
    
    // function commentSelection(isComment) {
    //   var range = getSelectedRange();
    //   editor.commentRange(isComment, range.from, range.to);
    // }      
  
    this.codeMirrorInstance.on('change', this.updateValue);
    // this.codeMirrorInstance.autoFormatRange();
  }

  render() {
    return (
      <div ref={this.updateRef} className="m-codeEditor" />
    );
  }
}

export default CodeEditor;
