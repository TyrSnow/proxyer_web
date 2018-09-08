import * as React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Provider } from 'react-redux';

import history from './shared/history';
import store from './store';

import LoginPage from './page/login';
import InitialPage from './page/initialize';
import LoadingPage from './page/loading';
import IndexPage from './page/index';
import PreviewPage from './page/preview';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/loading" component={LoadingPage} />
            <Route path="/initialize" component={InitialPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/preview" component={PreviewPage} />
            <Route path="/" component={IndexPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
