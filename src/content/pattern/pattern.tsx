import * as React from 'react';
import {
  Tag,
  Icon,
  Switch,
  Modal,
} from 'antd';
import { METHOD_TYPE, METHOD_COLOR, METHOD_LABEL } from '../../constant/method';
import { THROTTLE_TYPE, HANDLE_TYPE } from '../../constant/pattern';
import { autobind } from '../../helper/autobind';
import { convertToFormFields } from '../../util/convertToFormFields';

interface PatternItemProps {
  _id: string
  match: string
  allow_methods?: number[]
  throttle: THROTTLE_TYPE
  handle?: HANDLE_TYPE
  mock_status?: string
  mock_type?: string
  mock_content?: string
  server?: string
  servername?: string
  delay?: number
  speed?: number
  enable?: boolean
  editPattern(detail: any): any
  togglePatternEnable(pattern: any, patternId: string, proxyId?: string): any
  deletePattern(patternId: string, proxyId?: string): any
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

  confirmDelete() {
    Modal.confirm({
      title: '确认删除？',
      content: '删除操作不可回滚',
      onOk: () => {
        this.props.deletePattern(this.props._id);
      },
    });
  }

  toggleEnable(e: any) {
    this.props.togglePatternEnable(e, this.props._id);
  }

  renderHandle() {
    const {
      handle,
      mock_status,
    } = this.props;

    switch (handle) {
      case HANDLE_TYPE.MOCK:
      case HANDLE_TYPE.BLOCK:
        return (
          <div className="handle f-df f-df_l">
            <Icon type="camera" />{mock_status}
          </div>
        );
      default:
        return (
          <div className="handle f-df f-df_l" />
        );
    }
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
              {delay} s
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
        {this.props.servername}
      </div>
    );
  }

  renderMethod(method: METHOD_TYPE) {
    return (
      <Tag key={method} color={METHOD_COLOR[method]}>{METHOD_LABEL[method]}</Tag>
    );
  }

  renderMethods(methods: METHOD_TYPE[]) {
    return (
      <div className="methods">
      {
        methods.map(this.renderMethod)
      }
      </div>
    );
  }

  render() {
    const {
      allow_methods,
      match,
      enable = false,
      server,
    } = this.props;

    return (
      <div className={this.getClassName()}>
        <Switch checked={enable} onChange={this.toggleEnable} />
        <div className="match">
          {
            allow_methods ? this.renderMethods(allow_methods) : null
          }
          <span className="url">{match}</span>
        </div>
        {this.renderThrottle()}
        {this.renderHandle()}
        {server ? this.renderProxy() : null}
        <div className="control">
          <Icon onClick={this.confirmDelete} className="btnIcon" type="delete" />
          <Icon onClick={this.edit} className="btnIcon" type="edit" />
        </div>
      </div>
    )
  }
}

export default PatternItem;
