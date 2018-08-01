import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import { autobind } from '../../helper/autobind';
import { HIDE_PATTERN_DETAIL, SHOW_CREATE_PATTERN, SHOW_PATTERN_DETAIL } from '../../constant/command';
import FormWrapModal from '../../components/formWrapModal';
import { Host } from '../../definition/proxy';

import DetailForm from './detail';

interface PatternModalProps {
  hosts: Immutable.List<Host>
  regist(name: string, handler: any): any
  release(name: string, handler: any): any
  createPattern(detail: any, proxyId?: string): any
  editPattern(detail: any, patternId: string, proxyId?: string): any
}

interface ProxyModalState {
  visible: boolean
  payload: any
  create: boolean
}

@autobind
class PatternModal extends React.Component<PatternModalProps, ProxyModalState> {
  public state: ProxyModalState = {
    visible: false,
    payload: {},
    create: false,
  };

  componentDidMount() {
    this.props.regist(HIDE_PATTERN_DETAIL, this.hideModal);
    this.props.regist(SHOW_PATTERN_DETAIL, this.showModal);
    this.props.regist(SHOW_CREATE_PATTERN, this.showCreateModal);
  }

  componentWillUnmount() {
    this.props.release(HIDE_PATTERN_DETAIL, this.hideModal);
    this.props.release(SHOW_PATTERN_DETAIL, this.showModal);
    this.props.release(SHOW_CREATE_PATTERN, this.showCreateModal);
  }

  showModal(payload: any) {
    this.setState({
      visible: true,
      payload,
      create: false,
    });
  }

  showCreateModal(payload: any = {}) {
    this.setState({
      visible: true,
      payload,
      create: true,
    });
  }

  hideModal() {
    this.setState({
      visible: false,
    });
  }

  submit(fields: any) {
    // 处理结果
    if (fields.server === '') {
      fields.server = null;
    }
    if (!fields.methods) {
      fields.methods = [];
    }
    if (this.state.create) {
      return this.props.createPattern(fields);
    } else {
      return this.props.editPattern(fields, this.state.payload._id);
    }
  }

  render() {
    const {
      visible, payload,
    } = this.state;

    return (
      <FormWrapModal
        title="匹配"
        width="800px"
        visible={visible}
        data={payload}
        onCancel={this.hideModal}
        onSubmit={this.submit}
      >
        <DetailForm
          hosts={this.props.hosts}
        />
      </FormWrapModal>
    );
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    hosts: state.getIn(['proxy', 'detail', 'hosts']),
    trigger_count: state.getIn(['command', 'trigger_count']),
  }),
  {
    regist: actions.command.regist,
    release: actions.command.release,
    createPattern: actions.proxy.createPattern,
    editPattern: actions.proxy.editPattern,
  },
)(PatternModal);
