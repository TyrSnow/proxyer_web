import * as React from 'react';
import {
  Select,
} from 'antd';

const { Option } = Select;

export default class MethodSelect extends React.Component {
  render() {
    return (
      <Select>
        <Option value="all">ALL</Option>
      </Select>
    )
  }
}
