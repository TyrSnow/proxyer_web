import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './styles/index.css';

// 配置第三方
import './start/config.axios';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
