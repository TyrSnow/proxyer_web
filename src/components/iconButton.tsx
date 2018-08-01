import * as React from 'react';
import {
  Icon,
  Tooltip,
} from 'antd';
import { autobind } from '../helper/autobind';
import { IconProps } from 'antd/lib/icon';

interface IconButtonProps extends IconProps {
  tip?: string
}

@autobind
class IconButton extends React.PureComponent<IconButtonProps> {
  render() {
    const { tip, ...iconProps } = this.props;

    if (tip) {
      return (
        <Tooltip
          title={tip}
          mouseEnterDelay={0.5}
          arrowPointAtCenter={true}
        >
          <Icon className="btnIcon" {...iconProps} />
        </Tooltip>
      );
    }
    return <Icon className="btnIcon" {...iconProps} />;
  }
}

export default IconButton;
