import * as React from 'react';
import {
  Tag,
  Icon,
  Switch,
} from 'antd';
import { METHOD_TYPE, METHOD_COLOR, METHOD_LABEL } from '../../constant/method';
import { THROTTLE_TYPE } from '../../constant/pattern';
import { autobind } from '../../helper/autobind';
import { convertToFormFields } from '../../util/convertToFormFields';

interface PatternItemProps {
  _id: string
  match: string
  methods?: number[]
  throttle: THROTTLE_TYPE
  server?: string
  delay?: number
  speed?: number
  enable?: boolean
  editPattern(detail: any): any
  togglePatternEnable(pattern: any, patternId: string, proxyId?: string): any
}

@autobind
class PatternItem extends React.Component<PatternItemProps> {
  getClassName() {
    if (!this.props.enable) {
      return 'u-pattern f-df disable';
    }
    return 'u-pattern f-df';
  }

  edit() {
    this.props.editPattern(convertToFormFields(this.props));
  }

  toggleEnable(e: any) {
    this.props.togglePatternEnable(e, this.props._id);
  }

  renderThrottle() {
    const {
      throttle,
      delay,
      speed,
    } = this.props;
    switch (throttle) {
      case THROTTLE_TYPE.PAUSE:
        return (
          <div className="throttle f-df f-df_l">
            <Icon type="pause-circle-o" />
          </div>
        );
        case THROTTLE_TYPE.DELAY:
          return (
            <div className="throttle f-df f-df_l">
              <Icon type="clock-circle-o" />
              {delay} ms
            </div>
          );
        case THROTTLE_TYPE.SPEED:
          return (
            <div className="throttle f-df f-df_l">
              <Icon type="dashboard" />
              {speed} kb/s
            </div>
          );
        default:
          return null;
    }
  }

  renderProxy() {
    return (
      <div className="proxy">
        <Icon type="swap" />
        {this.props.server}
      </div>
    );
  }

  renderMethod(method: METHOD_TYPE) {
    return (
      <Tag key={method} color={METHOD_COLOR[method]}>{METHOD_LABEL[method]}</Tag>
    );
  }

  renderMethods(methods: METHOD_TYPE[]) {
    return methods.map(this.renderMethod);
  }

  render() {
    const {
      methods,
      match,
      enable = false,
      server,
    } = this.props;

    return (
      <div className={this.getClassName()}>
        <Switch checked={enable} onChange={this.toggleEnable} />
        <div className="match">
          <span className="url">{match}</span>
          {
            methods ? this.renderMethods(methods) : null
          }
        </div>
        <div className="handle">
          {this.renderThrottle()}
          {server ? this.renderProxy() : null}
        </div>
        <Icon onClick={this.edit} className="btnIcon" type="edit" />
      </div>
    )
  }
}

export default PatternItem;
