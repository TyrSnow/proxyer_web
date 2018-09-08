import * as React from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as Immutable from 'immutable';

import { autobind } from '../../helper/autobind';
import { METHOD_LABEL_SELECT } from '../../constant/method';
import { THROTTLE_TYPE_LABEL, THROTTLE_TYPE, HANDLE_TYPE, MOCK_TYPE } from '../../constant/pattern';

import SwitchFormItem from '../../components/switchFormItem';
import formItemLayout from './formLayout';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
// const { TextArea } = Input;


interface DetailFormProps extends FormComponentProps {
  hosts: Immutable.List<any>
  match?: string
  allow_methods?: string[]
  throttle?: string
  handle?: string
  delay?: string
  speed?: string
  mock_status?: string
  mock_type?: string
  mock_content?: string
  server?: string
}

@autobind
class DetailForm extends React.Component<DetailFormProps> {
  static defaultProps = {
    throttle: THROTTLE_TYPE.NONE.toString(),
    speed: '30',
    delay: '10',
    server: '',
    handle: HANDLE_TYPE.NONE.toString(),
    mock_status: '200',
    mock_type: MOCK_TYPE.JSON.toString(),
    mock_content: '',
  };

  static throttleOptions = DetailForm.renderLabelOptions(THROTTLE_TYPE_LABEL);
  static methodOptions = DetailForm.renderLabelOptions(METHOD_LABEL_SELECT);

  static renderLabelOptions(label: any) {
    return Object.keys(label).map(key => (
      <Option
        key={key}
        value={key}
      >
        {label[key]}
      </Option>
    ));
  }

  renderHostOptions() {
    const { hosts } = this.props;
    return hosts.map(host => (
      <Option
        value={host.get('_id')}
        key={host.get('_id')}
      >
        {host.get('name')}
      </Option>
    ));
  }

  render() {
    const {
      props,
    } = this;
    const {
      getFieldDecorator,
      getFieldValue,
    } = props.form;

    const throttle = parseInt(getFieldValue('throttle') || props.throttle, 10);

    return (
      <Form>
        <FormItem {...formItemLayout} label="URL匹配">
          {getFieldDecorator('match', {
            initialValue: props.match,
            rules: [{ required: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Method限定">
          <SwitchFormItem initialValue={props.allow_methods ? props.allow_methods.length > 0 : false}>
          {getFieldDecorator('allow_methods', {
            initialValue: props.allow_methods,
          })(
            <Select mode="tags" placeholder="请选择需要限定的Method">
              {DetailForm.methodOptions}
            </Select>
          )}
          </SwitchFormItem>
        </FormItem>
        <FormItem {...formItemLayout} label="网速">
          <InputGroup compact={true}>
            {getFieldDecorator('throttle', {
              initialValue: props.throttle,
            })(
              <Select style={{ width: '40%' }}>
                {DetailForm.throttleOptions}
              </Select>
            )}
            {
              throttle === THROTTLE_TYPE.SPEED ? (
                getFieldDecorator('speed', {
                  initialValue: props.speed,
                  rules: [{ required: true, message: '请指定限速大小' }],
                })(
                  <Input type="number" min="1" step="10" style={{ width: '60%' }} addonAfter="kb/s" />
                )
              ) : null
            }
            {
              throttle === THROTTLE_TYPE.DELAY ? (
                getFieldDecorator('delay', {
                  initialValue: props.delay,
                  rules: [{ required: true, message: '请指定延时时间' }],
                })(
                  <Input type="number" min="0" step="10" style={{ width: '60%' }} addonAfter="s" />
                )
              ) : null
            }
          </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="转发到">
          {getFieldDecorator('server', {
            initialValue: props.server,
          })(
            <Select>
              <Option value="">默认</Option>
              {this.renderHostOptions()}
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(DetailForm);
