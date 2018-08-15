import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Icon,
} from 'antd';

import './index.css';

interface Link {
  to: string
  icon: string
}

interface LinkSiderProps {
  links: Link[]
}

class LinkSider extends React.Component<LinkSiderProps> {
  render() {
    return (
      <div className="frame-sider">
        {
          this.props.links.map(link => (
            <NavLink
              key={link.icon}
              className="link"
              to={link.to}
              exact={true}
              strict={true}
              activeClassName="active"
            >
              <Icon type={link.icon} />
            </NavLink>
          ))
        }
      </div>
    )
  }
}

export default LinkSider;
