import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface CollapseTextProps {
  text: string
  limit?: number
  default?: boolean
}

interface CollapseTextState {
  collapse: boolean
  text: string
}

@autobind
export default class CollapseText extends React.Component<CollapseTextProps, CollapseTextState> {
  static defaultProps ={
    text: '',
    limit: 200,
    default: true,
  };

  constructor(props: CollapseTextProps) {
    super(props);
    this.state = {
      text: this.getCollapseText(props.text, props.default as boolean, props.limit as number),
      collapse: props.default as boolean,
    };
  }

  shouldComponentUpdate(nextProps: CollapseTextProps, nextState: CollapseTextState) {
    if (
      (nextProps.text !== this.props.text) ||
      (nextProps.limit !== this.props.limit)
    ) {
      return true;
    }
    if (
      (nextState.collapse !== this.state.collapse)
    ) {
      return true;
    }
    return false;
  }

  getCollapseText(text: string, collapse: boolean, limit: number) {
    if (collapse && (text.length > limit)) {
      return `${text.substr(0, limit)}…`;
    }
    return text;
  }

  collapseChange() {
    const { text, limit } = this.props;
    this.setState((prevState) => {
      return {
        collapse: !prevState.collapse,
        text: this.getCollapseText(text, !prevState.collapse, limit as number),
      };
    });
  }

  render() {
    const { text } = this.state;
    return (
      <span onClick={this.collapseChange}>{text}</span>
    );
  }
}
