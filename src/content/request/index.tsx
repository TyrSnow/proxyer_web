import * as React from 'react';

import RequestFilter from './filter';
import RequestList from './list';

import './index.css';

class RequestContent extends React.Component {
  render() {
    return (
      <div className="m-request">
        <RequestFilter />
        <RequestList />
      </div>
    )
  }
}

export default RequestContent;
