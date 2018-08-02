import * as React from 'react';
import {
  Tag,
} from 'antd';
import { METHOD_LABEL, METHOD_COLOR } from '../../constant/method';

interface MethodTagProps {
  method: number
}

export class MethodTag extends React.PureComponent<MethodTagProps> {
  render() {
    const { method } = this.props;
    return (
      <Tag color={METHOD_COLOR[method]}>{METHOD_LABEL[method]}</Tag>
    )
  }
}
