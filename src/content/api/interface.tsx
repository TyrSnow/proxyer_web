import * as React from 'react';
import { MethodTag } from '../../components/tags';
import { autobind } from '../../helper/autobind';
import IconButton from '../../components/iconButton';

interface InterfaceProps {
  _id: string
  url: string
  method: number
  name?: string
  desc?: string
  block(interfaceId: string): any
}

interface InterfaceState {
  collapse: boolean
}

@autobind
class Interface extends React.Component<InterfaceProps, InterfaceState> {
  public state = {
    collapse: true,
  };

  toggleCollapse() {
    this.setState(({ collapse }) => ({
      collapse: !collapse,
    }));
  }

  blockInterface() {
    this.props.block(this.props._id);
  }

  render() {
    const {
      url, method, name, desc,
    } = this.props;
    const { collapse } = this.state;
    return (
      <div className={`u-interface ${collapse ? 'collapse' : ''}`}>
        <div className="info" onClick={this.toggleCollapse}>
          <div>
            <MethodTag method={method} />
            <span className="url">{url}</span>
            <span className="name">{name}</span>
          </div>
          <span className="control">
            <IconButton
              type="delete"
              onClick={this.blockInterface}
            />
            <IconButton
              type="edit"
            />
          </span>
        </div>
        <div className="content">
          <div className="line">{desc}</div>
        </div>
      </div>
    );
  }
}

export default Interface;
