import * as React from 'react';

const resizeMap = { // 部分icon跟其他icon会有点不一样大
  restart: 16,
};

export interface IconFontProps extends React.HTMLAttributes<any> {
  type: string
}

class IconFont extends React.PureComponent<IconFontProps> {
  resetStyle() {
    const { style, type } = this.props;
    if (resizeMap[type]) {
      return Object.assign({}, style, {
        fontSize: resizeMap[type],
      });
    }
    return style;
  }

  render() {
    const { type, className = '', ...other } = this.props;
    return (
      <i
        {...other}
        className={`${className} iconfont icon-${type}`}
        style={this.resetStyle()}
      />
    );
  }
}

export default IconFont;
