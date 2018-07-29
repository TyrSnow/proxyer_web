import * as React from 'react';
import {
  Form, Input, Switch,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { isHost } from '../../helper/validate';

const FormItem = Form.Item;

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

interface EditFormProps extends FormComponentProps {
  target?: string
  name?: string
  changeOrigin?: boolean
  disable?: boolean
}

class EditForm extends React.Component<EditFormProps> {
  validateHost(rules: any, value: any, callback: any) {
    if (isHost(value)) {
      callback();
    } else {
      callback('非法的主机地址');
    }
  }

  render() {
    const {
      props,
    } = this;
    const {
      getFieldDecorator,
    } = this.props.form;

    return (
      <Form >
        <FormItem {...formItemLayout} label="目标地址">
          {getFieldDecorator('target', {
            initialValue: props.target,
            rules: [{
              required: true,
              validator: this.validateHost
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="别名">
          {getFieldDecorator('name', {
            initialValue: props.name,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="ChangeOrigin">
          {getFieldDecorator('changeOrigin', {
            initialValue: props.changeOrigin,
            valuePropName: 'checked',
          })(
            <Switch />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="启用">
          {getFieldDecorator('enable', {
            initialValue: !props.disable,
            valuePropName: 'checked',
          })(
            <Switch />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(EditForm);
