import * as React from 'react';

import './index.css';
import Control from './control';
import List from './list';

class ApiContent extends React.Component {
  render() {
    return (
      <div className="m-api">
        <Control />
        <List />
      </div>
    );
  }
}

export default ApiContent;
