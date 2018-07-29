import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Icon,
} from 'antd';

export default class Sider extends React.Component {
  render() {
    return (
      <div className="frame-sider">
        <NavLink
          className="link"
          to="/"
          exact={true}
          strict={true}
          activeClassName="active"
        >
          <Icon type="wifi" />
        </NavLink>
        <NavLink
          className="link"
          to="/pattern"
          exact={true}
          strict={true}
          activeClassName="active"
        >
          <Icon type="filter" />
        </NavLink>
        <NavLink
          className="link"
          to="/server"
          exact={true}
          strict={true}
          activeClassName="active"
        >
          <Icon type="desktop" />
        </NavLink>
        {/* <NavLink
          className="link"
          to="/setting"
          exact={true}
          strict={true}
          activeClassName="active"
        >
          <Icon type="setting" />
        </NavLink> */}
      </div>
    );
  }
}
