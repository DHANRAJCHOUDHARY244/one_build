/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unused-imports/no-unused-vars-ts */
import { Form, Modal, Input, Row, Col, Select } from 'antd';
import { useEffect, useState } from 'react';

import userService from '@/api/services/userService';

import { renderStatusTag } from './common';

import { User } from '#/entity';
import { UserStatus } from '#/enum';

export type UserModalProps = {
  formValue: User;
  title: string;
  show: boolean;
  onOk: (formValue: User) => void;
  onCancel: VoidFunction;
};

export function UserModal({ title, show, formValue, onCancel, onOk }: UserModalProps) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // validate all fields
      const { confirm_password, referred_by, ...userValues } = values;
      setConfirmLoading(true);
      onOk(values);
      await userService
        .createUser(userValues)
        .then(() => console.log('User created'))
        .catch((err) => console.log('Error creating user', err));
      setConfirmLoading(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={title}
      open={show}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okText="Submit"
    >
      <Form
        form={form}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 24 }} // full-width label above input
        wrapperCol={{ span: 24 }} // inputs take full width
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'The input is not a valid email!' },
              ]}
            >
              <Input type="email" placeholder="EMAIL ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="referred_by">
              <Input placeholder="REF ID" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirm_password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm the password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="confirm password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="transaction_id"
              rules={[{ required: true, message: 'Please input the transaction ID!' }]}
            >
              <Input placeholder="Transaction ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="amount">
              <Input placeholder="Amount" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mobile">
              <Input placeholder="mobile" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status">
              <Select placeholder="Select status">
                <Select.Option value={UserStatus.APPROVED}>
                  {renderStatusTag(UserStatus.APPROVED)}
                </Select.Option>
                <Select.Option value={UserStatus.PENDING}>
                  {renderStatusTag(UserStatus.PENDING)}
                </Select.Option>
                <Select.Option value={UserStatus.REJECT}>
                  {renderStatusTag(UserStatus.REJECT)}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
