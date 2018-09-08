import * as React from 'react';
import { autobind } from '../../helper/autobind';

interface ConfigSettingProps {

}

@autobind
class ConfigSetting extends React.Component<ConfigSettingProps> {
  render() {
    return (
      <div className="m-configSetting">设置项</div>
    );
  }
}

export default ConfigSetting;
