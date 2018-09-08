import * as React from 'react';
import {
  Tooltip,
} from 'antd';
import { autobind } from '../helper/autobind';
import IconFont from './IconFont';
import { IconFontProps } from './IconFont';

interface IconButtonProps extends IconFontProps {
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
          <IconFont className="btnIcon" {...iconProps} />
        </Tooltip>
      );
    }
    return <IconFont className="btnIcon" {...iconProps} />;
  }
}

export default IconButton;
