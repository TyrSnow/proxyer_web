import * as React from 'react';
import {
  Input,
  Radio,
  Select,
} from 'antd';

const { Search } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class RequestFilter extends React.Component {
  render() {
    return (
      <div className="m-filter ui-panel f-df">
        <div>
          <RadioGroup>
            <RadioButton>全部</RadioButton>
            <RadioButton>请求中</RadioButton>
            <RadioButton>已完成</RadioButton>
          </RadioGroup>
          <Select style={{ width: 100, marginLeft: 10 }}>
            <Option key="all" value="">全部</Option>
            <Option key="200" value="200">200</Option>
            <Option key="400" value="400">400</Option>
          </Select>
        </div>
        <div>
          <Search width="200" />
        </div>
      </div>
    )
  }
}

export default RequestFilter;
