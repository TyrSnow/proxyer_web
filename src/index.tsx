import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { whyDidYouUpdate } from 'why-did-you-update';
import App from './App';

import './styles/index.css';

// 配置第三方
import './start/config.axios';

whyDidYouUpdate(React);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
