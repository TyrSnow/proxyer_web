import * as React from 'react';
import {
  Switch,
} from 'antd';
import { autobind } from '../../helper/autobind';

import './index.css';

interface SwitchFormItemProps {
  initialValue?: boolean
}

interface SwitchFormItemState {
  checked: boolean
}

@autobind
class SwitchFormItem extends React.Component<SwitchFormItemProps, SwitchFormItemState> {
  constructor(props: SwitchFormItemProps) {
    super(props);
    this.state = {
      checked: props.initialValue || false,
    };
  }

  handeSwitchChange(e: boolean) {
    this.setState({
      checked: e,
    });
  }

  render() {
    return (
      <div className="m-switchFormItem">
        <Switch
          checked={this.state.checked}
          onChange={this.handeSwitchChange}
        />
        {this.state.checked ? this.props.children : null}
      </div>
    )
  }
}

export default SwitchFormItem;
