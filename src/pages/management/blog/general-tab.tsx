/* eslint-disable react/no-danger */
import { App, Button, Col, Form, Input, Row, Select,UploadFile } from 'antd';
import { useState } from 'react';

import Card from '@/components/card';
import Editor from '@/components/editor';
import BlogMobileView from './mobileView';
import UploadCropImage from './upload';
import { BlogPostData } from '#/entity';
import blogService from '@/api/services/blogService';
type FieldType = {
  name?: string;
};

export default function GeneralTab() {
  const { notification } = App.useApp();
  const [quillFull, setQuillFull] = useState(''); 
  const [title,setTitle]=useState('');
  const initFormValues = {
    name: '',
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]); // State to hold the file list


  const handleFileListUpdate = (newFileList: UploadFile[]) => {
    console.log("Updated File List:", newFileList);
    setFileList(newFileList); // Update the file list state
  };

  const handleClick = async () => {
    try {
      // Prepare the data to send to the saveBlogPost function
      const blogData: BlogPostData = {
        title: title, // You might want to get the name from the form state
        content: quillFull,
        images: fileList.length > 0 ? fileList[0].originFileObj as File : undefined, // Only set if exists
      };

      // Call the saveBlogPost function
      await blogService.saveBlogPost(blogData);

      // Notify user of success
      notification.success({
        message: 'Update success!',
        duration: 3,
      });
    } catch (error) {
      // Handle error
      console.error('Error while saving blog post:', error);
      notification.error({
        message: 'Update failed!',
        description: 'An error occurred while saving the blog post.',
        duration: 3,
      });
    }
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
        {/* Pass the content and image URL to BlogMobileView */}
        <BlogMobileView content={quillFull} fileList={fileList} />
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
                  <Input  placeholder='Enter title' onChange={(e)=>setTitle(e.target.value)}/>
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
                <UploadCropImage 
                 handleFileListUpdate={handleFileListUpdate} // Pass the function to update the file list
                 />
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
