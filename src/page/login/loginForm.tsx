import * as React from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Modal,
} from 'antd';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';

import { FormComponentProps } from 'antd/lib/form/Form';

import actions from '../../store/actions';
import { AUTH_STATE } from '../../constant/auth';
import history from '../../shared/history';
import { autobind } from '../../helper/autobind';

const FormItem = Form.Item;

interface LoginFormProps extends FormComponentProps {
  state: AUTH_STATE
  logIn(user: string, password: string, remember?: boolean): any
  clearAuth(): any
}

@autobind
class LoginForm extends React.Component<LoginFormProps> {
  componentWillReceiveProps(nextProps: LoginFormProps) {
    if (nextProps.state === AUTH_STATE.LOGGED) {
      history.push('/');
    }
  }

  submit() {
    this.props.form.validateFields((err, fields) => {
      if (err) {
        return;
      }
      this.props.logIn(fields.userName, fields.password).catch((error: any) => {
        Modal.error({
          title: error.message,
        });
        this.props.clearAuth();
      });
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
          <Button
            onClick={this.submit}
            loading={this.props.state === AUTH_STATE.LOGING}
            type="primary"
            className="login-form-button"
          >
            Log in
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
    logIn: actions.auth.logIn,
    clearAuth: actions.auth.clearAuth,
  }
)(Form.create()(LoginForm));
