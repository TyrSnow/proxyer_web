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
import { THROTTLE_TYPE_LABEL, THROTTLE_TYPE } from '../../constant/pattern';

import SwitchFormItem from '../../components/switchFormItem';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

interface DetailFormProps extends FormComponentProps {
  hosts: Immutable.List<any>
  match?: string
  methods?: string[]
  throttle?: string
  delay?: string
  speed?: string
  server?: string
}

@autobind
class DetailForm extends React.Component<DetailFormProps> {
  renderThrottleOptions() {
    return Object.keys(THROTTLE_TYPE_LABEL).map(key => (
      <Option
        key={key}
        value={key}
      >
        {THROTTLE_TYPE_LABEL[key]}
      </Option>
    ));
  }

  renderMethodOptions() {
    return Object.keys(METHOD_LABEL_SELECT).map(key => (
      <Option
        key={key}
        value={key}
      >
        {METHOD_LABEL_SELECT[key]}
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
          <SwitchFormItem initialValue={props.methods ? props.methods.length > 0 : false}>
          {getFieldDecorator('methods', {
            initialValue: props.methods,
          })(
            <Select mode="tags" placeholder="请选择需要限定的Method">
              {this.renderMethodOptions()}
            </Select>
          )}
          </SwitchFormItem>
        </FormItem>
        <FormItem {...formItemLayout} label="处理">
          <InputGroup compact={true}>
            {getFieldDecorator('throttle', {
              initialValue: props.throttle,
            })(
              <Select style={{ width: '40%' }}>
                {this.renderThrottleOptions()}
              </Select>
            )}
            {
              throttle === THROTTLE_TYPE.SPEED ? (
                getFieldDecorator('speed', {
                  initialValue: props.speed || '100',
                  rules: [{ required: true, message: '请指定限速大小' }],
                })(
                  <Input type="number" min="0" step="10" style={{ width: '60%' }} addonAfter="kb/s" />
                )
              ) : null
            }
            {
              throttle === THROTTLE_TYPE.DELAY ? (
                getFieldDecorator('delay', {
                  initialValue: props.delay || '30',
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
            initialValue: props.server || '',
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
