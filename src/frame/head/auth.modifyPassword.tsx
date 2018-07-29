import * as React from 'react';
import { Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { autobind } from '../../helper/autobind';

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

interface AuthModifyPasswordProps extends FormComponentProps {
}

@autobind
class AuthModifyPassword extends React.Component<AuthModifyPasswordProps> {
  validateNew(rule: any, value: string, callback: any) {
    const oldPassword = this.props.form.getFieldValue('oldPassword');
    if (!value || (value === '')) {
      return callback('请输入新密码');
    }
    if (oldPassword === value) {
      return callback('新密码不能与旧密码一样');
    }
    return callback();
  }

  validateConfirm(rule: any, value: string, callback: any) {
    const newPassword = this.props.form.getFieldValue('password');
    if (!value || (value === '')) {
      return callback('请再次输入新密码');
    }
    if (newPassword !== value) {
      return callback('两次输入的新密码不一致');
    }
    return callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <FormItem {...formItemLayout} label="当前密码">
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: '请输入当前密码' }]
          })(
            <Input type="password" prefix={<Icon type="lock" />} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="新密码">
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              validator: this.validateNew,
            }]
          })(
            <Input type="password" prefix={<Icon type="lock" />} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="确认新密码">
          {getFieldDecorator('confirmPassword', {
            rules: [{
              required: true,
              validator: this.validateConfirm,
            }]
          })(
            <Input type="password" prefix={<Icon type="lock" />} />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AuthModifyPassword);
