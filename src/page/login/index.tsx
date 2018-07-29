import * as React from 'react';
import {
  Tabs,
} from 'antd';
import './index.css';

import LoginForm from './loginForm';
import RegistForm from './registForm';

const TabPane = Tabs.TabPane;

class LoginPage extends React.Component {
  render() {
    return (
      <div className="page p-login">
        <div className="logo">
          <div className="logo-icon">Proxyer<span className="beta">Beta</span></div>
        </div>
        <div className="inner">
          <div className="borderBox">
            <Tabs>
              <TabPane key="login" tab="Login">
                <LoginForm />
              </TabPane>
              <TabPane key="regist" tab="Regist">
                <RegistForm />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
