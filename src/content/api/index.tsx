import * as React from 'react';
import * as Immutable from 'immutable';

import './index.css';
import Control from './control';
import List from './list';
import { connect } from 'react-redux';
import { loadInterfaceList, analysisProxyInterface } from '../../services/interface';
import { autobind } from '../../helper/autobind';

interface ApiContentProps {
  activeId: string
}

interface ApiContentState {
  activeId: string
  interfaceList: any[]
}

@autobind
class ApiContent extends React.Component<ApiContentProps, ApiContentState> {
  constructor(props: ApiContentProps) {
    super(props);
    this.state = {
      activeId: props.activeId,
      interfaceList: [],
    };
  }

  componentDidMount() {
    if (this.props.activeId) {
      this.fetch();
    }
  }

  componentWillReceiveProps(nextProps: ApiContentProps) {
    if (nextProps.activeId !== this.state.activeId) {
      this.setState({
        activeId: nextProps.activeId,
      });
      this.fetch(nextProps.activeId);
    }
  }

  updateInterfaceList(response: any) {
    console.debug(response);
    this.setState({
      interfaceList: response.data.data,
    });
  }

  fetch(proxyId: string = this.state.activeId, forceReload: boolean = false) {
    loadInterfaceList(proxyId, forceReload).then(this.updateInterfaceList)
  }

  analysis() {
    analysisProxyInterface(this.state.activeId).then(response => {
      this.fetch(this.state.activeId, true);
    });
  }

  blockInterface(interfaceId: string) {
    console.debug(interfaceId);
  }

  render() {
    return (
      <div className="m-api">
        <Control
          analysis={this.analysis}
        />
        <List
          list={this.state.interfaceList}
          block={this.blockInterface}
        />
      </div>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    activeId: state.getIn(['proxy', 'active_id']),
  })
)(ApiContent);
