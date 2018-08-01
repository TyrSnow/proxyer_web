import * as React from 'react';
import {
  Modal, Form,
} from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { autobind } from '../helper/autobind';
import { dirt } from '../util';

export interface FormWrapModalProps extends ModalProps {
  data?: any
  dirt?: boolean
  onSubmit?(fields: any): Promise<any>
}

@autobind
class FormWrapModal extends React.Component<FormWrapModalProps> {
  static defaultProps = {
    data: {},
  };

  shouldComponentUpdate(nextProps: FormWrapModalProps) {
    console.debug('check update: ', nextProps);
    if (nextProps.visible) { // 可见的时候
      return true;
    }
    if (this.props.visible && !nextProps.visible) { // 可见性翻转
      return true;
    }
    if (this.props.dirt !== nextProps.dirt) {
      return true;
    }
    return false;
  }

  validAndCollectRef(ref: any) {
    return new Promise((resolve, reject) => {
      ref.validateFields((err: any, fields: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(fields);
      });
    });
  }

  collectAll() {
    const promises = [];
    let key;
    for (key in this.refs) {
      if (typeof this.refs[key] === 'object') {
        promises.push(this.validAndCollectRef(this.refs[key]));
      }
    }

    return Promise.all(promises);
  }

  handleCancel(e: React.MouseEvent) {
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }
  }

  handleOk(e: React.MouseEvent) {
    this.collectAll().then((fieldsList) => {
      const fields = {};
      fieldsList.map((sub) => {
        Object.assign(fields, sub);
      });

      if (this.props.dirt) {
        dirt(fields, this.props.data);
      }
      if (this.props.onSubmit) {
        return this.props.onSubmit(fields);
      }
      return Promise.reject({
        message: '没有定义表单的处理函数',
      });
    }).then(res => {
      console.debug('response: ', res);
      Modal.success({
        title: res.message || '操作成功',
      });
      if (this.props.onCancel) {
        this.props.onCancel(e);
      }
    }).catch(err => {
      console.debug('err: ', err);
      if (err.message) { // 有提示再弹窗
        Modal.error({
          title: err.message,
        });
      }
    });
  }

  renderChildren() {
    console.debug('Active Data: ', this.props.data);
    return React.Children.map(this.props.children, (child: React.ReactElement<Form>, index) => {
      return React.cloneElement(child, Object.assign({
        ref: `child${index}`,
      }, this.props.data));
    });
  }

  render() {
    const { onSubmit, onCancel, ...other } = this.props;
    return (
      <Modal
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        {...other}
        destroyOnClose={true}
      >
        {this.renderChildren()}
      </Modal>
    )
  }
}

export default FormWrapModal;
