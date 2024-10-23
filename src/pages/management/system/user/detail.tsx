import { UserByIdResponseData, UserReferral } from '#/entity';
import userService from '@/api/services/userService';
import { useParams } from '@/router/hooks';
import { Button, Col, Form, Input, Row, Table, DatePicker, Image, Space } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-input {
    border-color: #c7d1d9;
    border-radius: 6px;
  }

  .ant-picker {
    border-color: #c7d1d9;
    border-radius: 6px;
  }

  button {
    border-radius: 20px;
  }

  .pdf-button {
    background: #f5f5f5;
    border: 1px solid #c7d1d9;
    border-radius: 6px;
    color: #6a707e;
    padding: 8px;
  }
`;

const UserDetailsPage = () => {
  const { id } = useParams();
const [userData, setUserData] = useState<UserByIdResponseData | undefined>();
const [referralsData, setReferralData] = useState<UserReferral[]>();
const [mediaVisibility, setMediaVisibility] = useState<{ [key: number]: boolean }>({});

useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await userService.getUserById(id);
      if (data) {
        setUserData(data);
        const { user_referrals } = data;
        setReferralData(user_referrals);
      }
    } catch (err) {
      console.log('Error fetching user data', err);
    }
  };

  fetchUser();
}, [id]);


  const toggleMediaVisibility = (mediaId: number) => {
    setMediaVisibility((prevVisibility) => ({
      ...prevVisibility,
      [mediaId]: !prevVisibility[mediaId],
    }));
  };

  const columns = [
    { title: 'User Name', dataIndex: 'user_name', key: 'user_name' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    { title: 'REF ID', dataIndex: 'referral_code', key: 'referral_code' },
  ];

  return (
    <StyledForm layout="vertical">
      <h2 className='font-bold text-lg'>Full Name: { userData?.user[0].first_name } {userData?.user[0].last_name }</h2>
      <Row gutter={16} className='mt-4'>
        <Col span={12}>
          <Form.Item label="User Name" name="user_name">
            <Input  disabled placeholder={userData?.user[0].user_name}  />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              placeholder={userData?.user[0].email}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="REF ID" name="refId">
            <Input  disabled  placeholder={userData?.user[0].referral_code} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Joining Date" name="joiningDate">
            <Input  disabled placeholder={userData?.user[0].created_at} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Address" name="Address">
            <Input  disabled placeholder={userData?.user[0].address} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="DOB" name="dob">
            <Input  disabled placeholder={userData?.user[0].dob} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Wallet" name="wallet">
            <Input  disabled placeholder={userData?.user[0].wallet.toString() || ''} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone" name="phone">
            <Input  disabled placeholder={userData?.user[0].phone} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Plan" name="plan">
            <Input  disabled placeholder={userData?.user[0].plan} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Occupation" name="Occupation">
            <Input  disabled placeholder={userData?.user[0].occupation || ''} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        {/* User's Documents */}
        <Col span={24}>
          <h4 className='font-bold text-lg'>User's Documents</h4>
        </Col>
        {userData?.user[0].media.map((media) => (
            <>
       <Col span={12}> {/* Center align items vertically */}
        <Form.Item label={`${media.media_category} Details`} name="panCard" className='w-[60%]'>
        <Space.Compact style={{ width: '100%' }}>
             <Input  disabled placeholder={`${media.media_category} Details`} />
        <Button className="pdf-button" style={{borderRadius:"0 5px 5px 0"}} onClick={() => toggleMediaVisibility(media.id)}>Show Image</Button> {/* Add margin to the left for spacing */}
    </Space.Compact>
        </Form.Item>
                  {mediaVisibility[media.id] && (
                        <Image
                          alt={media.media_category}
                          src={media.media_path}
                          className="rounded-lg shadow-md object-cover"
                          width={100}
                          height={100}
                        />
                      )}
   </Col>
        </>  ))}

        {/* Nominee's Details */}
        <Col span={24}>
          <h4 className='font-bold text-lg'>Nominee's Details</h4>
        </Col>
        <Col span={12}>
          <Form.Item label="Nominee Name" name="nomineeName">
            <Input  disabled placeholder={userData?.user[0].nominee_name} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nominee DOB" name="nomineeDob">
            <DatePicker placeholder="Nominee DOB" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
          {/* Bank Details */}
          <Col span={24}>
          <h4 className='font-bold text-lg'>Bank Details</h4>
        </Col>
        <Col span={12}>
          <Form.Item label="Bank Name" name="bankName">
            <Input  disabled placeholder={userData?.user[0].bank_name} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Beneficiary Name" name="beneficiaryName">
            <Input  disabled placeholder={userData?.user[0].beneficiary_name || ''} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Account No" name="accountNo">
            <Input  disabled placeholder={userData?.user[0].account_number || ''} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Branch" name="Branch">
            <Input  disabled placeholder={ userData?.user[0].branch || ''} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Ifsc Code" name="ifsc">
            <Input  disabled placeholder={userData?.user[0].ifsc_code || ''} />
          </Form.Item>
        </Col>

        {/* Referrals */}
        <Col span={24} className='mb-28'>
          <h4>Referrals</h4>
          <Table columns={columns} dataSource={referralsData} pagination={false} />
        </Col>
      </Row>
    </StyledForm>
  );
};
export default UserDetailsPage
