import * as React from 'react';
import {
  Icon,
  // Input,
  Radio,
  // Select,
} from 'antd';

// const { Search } = Input;
// const { Option } = Select;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

interface RequestFilterProps {
  loading: boolean
}

class RequestFilter extends React.Component<RequestFilterProps> {
  renderFetchStatus() {
    if (this.props.loading) {
      return <Icon className="u-fetchStatus" type="loading" />;
    }
    return <Icon className="u-fetchStatus" type="clock-circle-o" />;
  }

  render() {
    return (
      <div className="m-filter ui-panel f-df">
        {
          this.renderFetchStatus()
        }
        <RadioGroup>
          <RadioButton value="0">全部</RadioButton>
          <RadioButton value="1">请求中</RadioButton>
          <RadioButton value="2">已完成</RadioButton>
        </RadioGroup>
          {/* 
          <Select style={{ width: 100, marginLeft: 10 }}>
            <Option key="all" value="">全部</Option>
            <Option key="200" value="200">200</Option>
            <Option key="400" value="400">400</Option>
          </Select>
        </div>
        <div>
          <Search width="200" />
        </div> */}
      </div>
    )
  }
}

export default RequestFilter;
