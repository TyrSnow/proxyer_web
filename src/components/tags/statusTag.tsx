import * as React from 'react';
import {
  Tag,
  Icon,
} from 'antd';

interface StatusTagProps {
  status: number
  finished?: boolean
}

export class StatusTag extends React.PureComponent<StatusTagProps> {
  static getResponseColor(status: number) {
    if (status === 0) {
      return 'orange';
    } else if (status === 200) {
      return 'green';
    } else if (status === 301) {
      return 'cyan';
    }
    return 'red';
  }

  render() {
    const { status, finished = true } = this.props;

    return (
      <Tag color={StatusTag.getResponseColor(status)}>
      {
        finished ? status : (
          <Icon type="sync" spin={true} />
        )
      }
      </Tag>
    );
  }
}
