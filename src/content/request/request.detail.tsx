import * as React from 'react';

interface RequestDetailProps {
  _id: string
  url: string
  status: number
  method: number
  pattern: number
  cost: number
  headers: object
  requestContent: string
  responseHeaders: object
  responseContent: string
  updatedAt: string
  createdAt: string
}

class RequestDetail extends React.Component<RequestDetailProps> {

}

export default RequestDetail;
