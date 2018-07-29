import * as React from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { FormComponentProps } from 'antd/lib/form/Form';

import actions from '../../store/actions';
import { AUTH_STATE } from '../../constant/auth';
import history from '../../shared/history';
import { autobind } from '../../helper/autobind';

const FormItem = Form.Item;

interface RegistFormProps extends FormComponentProps {
  state: AUTH_STATE,
  regist(name: string, password: string): any
}

@autobind
class RegistForm extends React.Component<RegistFormProps> {
  componentWillREceiveProps(nextProps: RegistFormProps) {
    if (nextProps.state === AUTH_STATE.LOGGED) {
      history.push('/');
    }
  }

  handleRegist() {
    this.props.form.validateFields((err, fields) => {
      if (err) {
        return;
      }
      this.props.regist(fields.userName, fields.password);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Confirm your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.state === AUTH_STATE.REGISTING}
            onClick={this.handleRegist}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Regist
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    state: state.getIn(['auth', 'state']),
  }),
  {
    regist: actions.auth.regist,
  }
)(Form.create()(RegistForm));
