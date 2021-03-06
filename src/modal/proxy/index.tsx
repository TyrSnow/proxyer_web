import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import FormWrapModal from '../../components/formWrapModal';
import actions from '../../store/actions';

import DetailForm from './detail';
import { HIDE_PROXY_DETAIL, SHOW_PROXY_DETAIL, SHOW_CREATE_PROXY, SHOW_PROXY_COPY } from '../../constant/command';
import { autobind } from '../../helper/autobind';
import { PROXY_STATUS } from '../../constant/proxy';

interface ProxyModaPayload {
  title?: string
  _id?: string
  name?: string
  status?: PROXY_STATUS
  port?: string
}

interface ProxyModalProps {
  regist(name: string, handler: any): any
  release(name: string, handler: any): any
  submitCreate(name: string, port: number, proxyId?: string): any
  updateProxyDetail(detail: any, proxyId?: string): any
}

interface ProxyModalState {
  visible: boolean
  payload: ProxyModaPayload
  create: boolean
  copy: boolean
}

@autobind
class ProxyModal extends React.Component<ProxyModalProps, ProxyModalState> {
  public state: ProxyModalState = {
    visible: false,
    payload: {},
    create: false,
    copy: false,
  };

  componentDidMount() {
    this.props.regist(HIDE_PROXY_DETAIL, this.hideModal);
    this.props.regist(SHOW_PROXY_DETAIL, this.showModal);
    this.props.regist(SHOW_CREATE_PROXY, this.showCreateModal);
    this.props.regist(SHOW_PROXY_COPY, this.showCreateCopy);
  }

  componentWillUnmount() {
    this.props.release(HIDE_PROXY_DETAIL, this.hideModal);
    this.props.release(SHOW_PROXY_DETAIL, this.showModal);
    this.props.release(SHOW_CREATE_PROXY, this.showCreateModal);
    this.props.release(SHOW_PROXY_COPY, this.showCreateCopy);
  }

  hideModal() {
    this.setState({
      visible: false,
    });
  }

  showModal(payload: any = {}) {
    this.setState({
      visible: true,
      payload,
      create: false,
      copy: false,
    });
  }

  showCreateModal(payload: any = {}) {
    this.setState({
      visible: true,
      payload,
      create: true,
      copy: false,
    });
  }

  showCreateCopy(payload: any = {}) {
    this.setState({
      visible: true,
      payload,
      create: true,
      copy: true,
    });
  }

  handleSubmit(fields: any) {
    if (this.state.create) {
      if (this.state.copy) {
        return this.props.submitCreate(fields.name, parseInt(fields.port, 10), this.state.payload._id);
      }
      return this.props.submitCreate(fields.name, parseInt(fields.port, 10));
    }
    return this.props.updateProxyDetail(fields, this.state.payload._id);
  }

  render() {
    const {
      visible,
      payload,
      copy,
    } = this.state;
    const { title } = payload;
    return (
      <FormWrapModal
        title={title}
        visible={visible}
        dirt={!copy}
        data={payload}
        onCancel={this.hideModal}
        onSubmit={this.handleSubmit}
      >
        <DetailForm />
      </FormWrapModal>
    )
  }
}

export default connect(
  (state: Immutable.Map<string, any>) => ({
    trigger_count: state.getIn(['command', 'trigger_count']),
  }),
  {
    regist: actions.command.regist,
    release: actions.command.release,
    submitCreate: actions.proxy.createProxy,
    updateProxyDetail: actions.proxy.updateProxyDetail,
  },
)(ProxyModal);
