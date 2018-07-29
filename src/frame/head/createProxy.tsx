import * as React from 'react';
import {
  Icon,
} from 'antd';
import { autobind } from '../../helper/autobind';

interface CreateProxyProps {

}

interface CreateProxyState {
  createFormVisible: boolean
}

@autobind
class CreateProxy extends React.Component<CreateProxyProps, CreateProxyState> {
  constructor(props: CreateProxyProps) {
    super(props);
    this.state = {
      createFormVisible: false,
    };
  }

  onShowCreateForm() {
    this.setState({
      createFormVisible: true,
    });
  }

  onHideCreateForm() {
    this.setState({
      createFormVisible: false,
    });
  }

  render() {
    const { createFormVisible } = this.state;
    return (
      <div className="m-createProxy">
        {
          createFormVisible ? (
            <Icon type="close" />
          ) : (
            <Icon type="plus" />
          )
        }
      </div>
    );
  }
}

export default CreateProxy;
