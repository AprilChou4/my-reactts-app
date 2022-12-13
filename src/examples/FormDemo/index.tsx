import React, { FC } from "react";
import { Form, Switch, Input } from "antd";
// interface IProps extends FormComponentProps {}
const FormDemo: FC = (props) => {
  const [form] = Form.useForm();
  console.log(form, "----form");
  //   const { getFieldDecorator } = form;

  return (
    <Form>
      {/* <Form.Item label="switch">
        {getFieldDecorator("switch")(<Switch />)}
      </Form.Item>
      <Form.Item label="名称">{getFieldDecorator("name")(<Input />)}</Form.Item> */}
    </Form>
  );
};

export default FormDemo;
