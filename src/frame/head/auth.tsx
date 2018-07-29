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

interface AuthProps {
  name: string
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
  }),
  {
    logOut: actions.auth.clearAuth,
    modifyPassword: actions.auth.modifyPassword,
  }
)(Auth);
