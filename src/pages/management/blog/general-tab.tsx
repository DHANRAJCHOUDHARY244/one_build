/* eslint-disable react/no-danger */
import { faker } from '@faker-js/faker';
import { App, Button, Col, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';
import { UploadBlogImage } from '@/components/upload';
import { useUserInfo } from '@/store/userStore';
import Editor from '@/components/editor';
import BlogMobileView from './mobileView';

type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  code?: string;
  about: string;
};

export default function GeneralTab() {
  const { notification } = App.useApp();
  const { avatar, user_name, email } = useUserInfo();
  const [quillFull, setQuillFull] = useState(''); // State for editor content
  const [uploadedImage, setUploadedImage] = useState(''); // State for uploaded image

  const initFormValues = {
    name: user_name,
    email,
    phone: faker.phone.number(),
    address: faker.location.county(),
    city: faker.location.city(),
    code: faker.location.zipCode(),
    about: faker.lorem.paragraphs(),
  };

  // Handle blog image upload
  const handleImageUpload = (url: string) => {
    setUploadedImage(url); // Set the uploaded image URL
  };

  const handleClick = () => {
    notification.success({
      message: 'Update success!',
      duration: 3,
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
        {/* Pass the content and image URL to BlogMobileView */}
        <BlogMobileView content={quillFull} imageSrc={uploadedImage} />
      </Col>
      <Col span={24} lg={16}>
        <Card>
          <Form
            layout="vertical"
            initialValues={initFormValues}
            labelCol={{ span: 8 }}
            className="w-full"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item<FieldType> label="Blog Title" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="status" label="Type">
                  <Select placeholder="Select status">
                    <Select.Option value="News">News</Select.Option>
                    <Select.Option value="Blogs">Blogs</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                {/* Blog content editor */}
                <Editor id="full-editor" value={quillFull} onChange={setQuillFull} />
              </Col>
              <Col span={12}>
                {/* Upload blog image and update state */}
                <UploadBlogImage defaultAvatar={avatar} onUpload={handleImageUpload} />
              </Col>
            </Row>

            <div className="flex w-full justify-end">
              <Button type="primary" onClick={handleClick}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
