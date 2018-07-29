import * as React from 'react';

import QuickControlBar from './quickControlBar';
import ProxySelect from './proxySelect';

import './index.css';

class QuickControl extends React.Component {
  render() {
    return (
      <div className="m-quickControl">
        <QuickControlBar />
        <ProxySelect />
      </div>
    );
  }
}

export default QuickControl;
