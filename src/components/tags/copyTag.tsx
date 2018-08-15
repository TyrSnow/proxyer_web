import * as React from 'react';
import {
  Tag,
  message,
} from 'antd';
import { TagProps } from 'antd/lib/tag';
import { autobind } from '../../helper/autobind';
import { copy } from '../../util/copy';

interface CopyTagProps extends TagProps {
  content: string
  successTip: string
}

@autobind
class CopyTag extends React.Component<CopyTagProps> {
  static defaultProps = {
    successTip: '内容已经复制到剪贴板',
  };

  handleClick() {
    copy(this.props.content).then(() => {
      message.success(this.props.successTip);
    }).catch(message.error);
  }

  render() {
    const {
      title,
      content,
      successTip,
      ...other
    } = this.props;
    return (
      <Tag
        {...other}
        onClick={this.handleClick}
      >{title}</Tag>
    )
  }
}

export default CopyTag;
