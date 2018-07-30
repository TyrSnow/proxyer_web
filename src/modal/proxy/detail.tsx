import * as React from 'react';
import {
  Form,
  Input,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { PROXY_STATUS } from '../../constant/proxy';

const FormItem = Form.Item;

interface ProxyDetailProps extends FormComponentProps {
  name?: string
  port?: string
  status?: PROXY_STATUS,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class ProxyDetail extends React.Component<ProxyDetailProps> {
  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;

    return (
      <Form>
        <FormItem label="代理名称" {...formItemLayout}>
        {
          getFieldDecorator('name', {
            initialValue: props.name,
            rules: [{ required: true }]
          })(
            <Input />
          )
        }
        </FormItem>
        <FormItem label="端口号" {...formItemLayout}>
        {
          getFieldDecorator('port', {
            initialValue: props.port,
            rules: [{ required: true }]
          })(
            <Input type="number" disabled={props.status === PROXY_STATUS.RUNNING} />
          )
        }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ProxyDetail);
