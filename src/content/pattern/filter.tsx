import * as React from 'react';
import {
  Button,
} from 'antd';

interface RequestFilterProps {
  createPattern(): any
}

class RequestFilter extends React.Component<RequestFilterProps> {
  render() {
    return (
      <div className="m-filter ui-panel f-df">
        <div />
        <div className="ui-btns">
          <Button onClick={this.props.createPattern} type="primary">新建</Button>
        </div>
      </div>
    )
  }
}

export default RequestFilter;
