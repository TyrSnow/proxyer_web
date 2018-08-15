import * as React from 'react';
import {
  Dropdown,
  Menu,
} from 'antd';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';

import FormWrapModal from '../../components/formWrapModal';
import actions from '../../store/actions';

import AuthModifyPassword from './auth.modifyPassword';
import { autobind } from '../../helper/autobind';
import { AUTH_TYPE } from '../../constant/auth';
import history from '../../shared/history';

interface AuthProps {
  name: string
  auth: AUTH_TYPE
  logOut(): any
  modifyPassword(oldPassword: string, password: string): any
}

interface AuthState {
  modifyPasswordVisible: boolean
}

@autobind
class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      modifyPasswordVisible: false,
    };
  }

  handleSubmitModifyPassword(fields: any) {
    return this.props.modifyPassword(fields.oldPassword, fields.password);
  }

  toSystem() {
    history.push('/system');
  }

  showModify() {
    this.setState({
      modifyPasswordVisible: true,
    });
  }

  hideModify() {
    this.setState({
      modifyPasswordVisible: false,
    });
  }

  renderSubMenus() {
    return (
      <Menu>
        {
          this.props.auth >= AUTH_TYPE.ADMIN ? (
            <Menu.Item onClick={this.toSystem}>系统管理</Menu.Item>
          ) : null
        }
        <Menu.Item onClick={this.showModify}>修改密码</Menu.Item>
        <Menu.Item onClick={this.props.logOut}>注销登录</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <Dropdown placement="bottomRight" overlay={this.renderSubMenus()}>
          <div className="f-df f-pointer">
            {this.props.name}
          </div>
        </Dropdown>
        <FormWrapModal
          title="修改密码"
          destroyOnClose={true}
          visible={this.state.modifyPasswordVisible}
          onCancel={this.hideModify}
          onSubmit={this.handleSubmitModifyPassword}
        >
          <AuthModifyPassword />
        </FormWrapModal>
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    name: state.getIn(['auth', 'name']),
    auth: state.getIn(['auth', 'auth']),
  }),
  {
    logOut: actions.auth.clearAuth,
    modifyPassword: actions.auth.modifyPassword,
  }
)(Auth);
