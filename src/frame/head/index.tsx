import * as React from 'react';
import Auth from './auth';

import QuickControl from '../../components/quickControl';
import { autobind } from '../../helper/autobind';

import './index.css';

interface HeadState {
  active: string
}

interface HeadProps {

}

@autobind
class Head extends React.Component<HeadProps, HeadState> {
  render() {
    return (
      <div className="frame-header">
        <div className="logo-icon">Proxyer<span className="beta">Beta</span></div>
        <div className="control">
          <QuickControl />
          <Auth />
        </div>
      </div>
    );
  }
}

export default Head;
