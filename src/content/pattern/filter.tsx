import * as React from 'react';
import {
  Radio,
  Button,
} from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

interface RequestFilterProps {
  createPattern(): any
}

class RequestFilter extends React.Component<RequestFilterProps> {
  render() {
    return (
      <div className="m-filter ui-panel f-df">
        <div>
          <RadioGroup>
            <RadioButton>全部</RadioButton>
            <RadioButton>启用</RadioButton>
          </RadioGroup>
        </div>
        <div className="ui-btns">
          <Button>测试</Button>
          <Button onClick={this.props.createPattern} type="primary">新建</Button>
        </div>
      </div>
    )
  }
}

export default RequestFilter;
