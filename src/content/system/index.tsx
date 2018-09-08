import * as React from 'react';
import * as systemService from '../../services/system';

import './index.css';

interface SystemContentProps {

}

interface SystemContentState {
  configs: any[]
}

class SystemContent extends React.PureComponent<SystemContentProps, SystemContentState> {
  public state = {
    configs: [],
  };

  componentWillMount() {
    systemService.getConfigs().then((configs: any[]) => {
      this.setState({
        configs,
      });
    });
  }

  render() {
    return (
      <div className="m-system">
        <div className="ui-panel">
          <div className="title">控制</div>
          <div className="line">1231231</div>
        </div>
      </div>
    );
  }
}

export default SystemContent;
