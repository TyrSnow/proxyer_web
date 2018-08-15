import * as React from 'react';
import { MethodTag } from '../../components/tags';

class Interface extends React.Component {
  render() {
    return (
      <div className="u-interface">
        <div className="line">
          <MethodTag method={0} />
          <span className="url">/api/test/test</span>
        </div>
      </div>
    );
  }
}

export default Interface;
