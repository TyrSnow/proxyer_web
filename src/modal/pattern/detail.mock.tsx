import * as React from 'react';
import {
  Form,
  Select,
  Input,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import formItemLayout from './formLayout';
import { HANDLE_TYPE, HANDLE_TYPE_LABEL, MOCK_TYPE_LABEL } from '../../constant/pattern';
import CodeEditor from '../../components/codeEditor';

const FormItem = Form.Item;
const { Option } = Select;

interface DetailMockFormProps extends FormComponentProps {
  handle?: string
  delay?: string
  speed?: string
  mock_status?: string
  mock_type?: string
  mock_content?: string
}

class DetailMockForm extends React.Component<DetailMockFormProps> {
  static handleOptions = DetailMockForm.renderLabelOptions(HANDLE_TYPE_LABEL);
  static mockTypeOptions = DetailMockForm.renderLabelOptions(MOCK_TYPE_LABEL);

  static renderLabelOptions(label: any) {
    return Object.keys(label).map(key => (
      <Option
        key={key}
        value={key}
      >
        {label[key]}
      </Option>
    ));
  }

  render() {
    const { props } = this;
    const {
      getFieldDecorator,
      getFieldValue,
    } = props.form;
  
    const handle = parseInt(getFieldValue('handle') || props.handle, 10);

    return (
      <Form>
        <FormItem {...formItemLayout} label="请求处理">
          {
            getFieldDecorator('handle', {
              initialValue: props.handle,
            })(
              <Select style={{ width: '40%' }}>
                {DetailMockForm.handleOptions}
              </Select>
            )
          }
        </FormItem>
        {
          handle !== HANDLE_TYPE.NONE ? (
            <FormItem key="mockStatus" {...formItemLayout} label="返回状态">
              {
                getFieldDecorator('mock_status', {
                  initialValue: props.mock_status,
                })(
                  <Input type="number" />
                )
              }
            </FormItem>
          ) : null
        }
        {
          handle === HANDLE_TYPE.MOCK ? ([
            <FormItem key="mockType" {...formItemLayout} label="返回数据类型">
              {
                getFieldDecorator('mock_type', {
                  initialValue: props.mock_type,
                })(
                  <Select style={{ width: '100%' }}>
                    {DetailMockForm.mockTypeOptions}
                  </Select>
                )
              }
            </FormItem>,
            <FormItem key="mockContent" {...formItemLayout} label="返回数据">
              {
                getFieldDecorator('mock_content', {
                  initialValue: props.mock_content,
                })(
                  <CodeEditor />
                )
              }
            </FormItem>,
          ]) : null
        }
      </Form>
    )
  }
}

export default Form.create()(DetailMockForm);
