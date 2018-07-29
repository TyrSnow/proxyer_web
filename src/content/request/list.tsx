import * as React from 'react';

import RequestItem from './request';

const fakeData = [{
  _id: '1',
  method: 'POST',
  response: 200,
  path: '/api/users',
  hit: true,
  log: true,
  cost: 32,
}, {
  _id: '2',
  method: 'GET',
  response: 301,
  path: '/api/users',
  hit: false,
  log: true,
  cost: 75,
}, {
  _id: '3',
  method: 'PUT',
  response: 200,
  path: '/api/users',
  hit: true,
  log: false,
  cost: 80,
}, {
  _id: '4',
  method: 'DELETE',
  response: 401,
  path: '/api/users',
  hit: true,
  log: false,
  cost: 80,
}, {
  _id: '5',
  method: 'POST',
  response: 0,
  path: '/api/users',
  hit: true,
  log: false,
  cost: 80,
}];

class RequestList extends React.Component {
  render() {
    return (
      <div className="m-requestlist ui-panel">
        {
          fakeData.map(request => (
            <RequestItem key={request._id} {...request} />
          ))
        }
      </div>
    )
  }
}

export default RequestList;
