import { Button, Card, Input,Row, Col, Form, DatePicker } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';

import userService, { FetchUserParams } from '@/api/services/userService';
import { IconButton, Iconify } from '@/components/icon';

import { UserModal, UserModalProps } from './user-modal';

import { User, UsersList } from '#/entity';
import { UserStatus } from '#/enum';
import type { DatePickerProps } from 'antd';
import { useRouter } from '@/router/hooks';

const DEFAULT_USER_VALUE: User = {
  user_name: '',
  email: '',
  password: '',
  referred_by: '',
  transaction_id: '',
  amount: null,
  status: UserStatus.PENDING,
  id: '',
  phone: '',
};

export default function UserPage() {
  const { push } = useRouter();
  const [users, setUsers] = useState<UsersList[]>([]);
  const [searchForm] = Form.useForm();
  const [selectedMonth, setSelectedMonth] = useState<any | null>(null);

  const [userModalProps, setUserModalProps] = useState<UserModalProps>({
    formValue: { ...DEFAULT_USER_VALUE },
    title: 'New',
    show: false,
    onCancel: () => {
      setUserModalProps((prev) => ({ ...prev, show: false }));
    },
  });;

  const fetchUsers = async (params: FetchUserParams={}) => {
    try {
      const { users } = await userService.fetchUser(params);
      setUsers(users);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'user_name',
    },
    {
      title: 'Ref Id',
      dataIndex: 'referral_code',
    },
    { title: 'Date Of Joining', dataIndex: 'created_at' },
    { title: 'Wallet', dataIndex: 'wallet' },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton  onClick={() => {
              push(`/management/user-details/${record.id}`);
            }}>
            <Iconify icon="carbon:view-filled" size={18} />
          </IconButton>
        </div>
      ),
    },
  ];

  const onCreate = () => {
    setUserModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Create New',
      formValue: { ...DEFAULT_USER_VALUE },
    }));
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString,'Date',date);
    if(!dateString) { setSelectedMonth(undefined); return; };
    
    setSelectedMonth(dateString)
  };
  const onSearch = async (values: { search?: string }) => {
    let params={ ...values, month: selectedMonth }
    if(!values.search) params.search = undefined;
    await fetchUsers(params);
  };

  const onReset = () => {
    searchForm.resetFields();
    setSelectedMonth(undefined);
    fetchUsers();
  };

  return (
    <Card
      title="User List"
      extra={
        <Button type="primary" onClick={onCreate}>
          New
        </Button>
      }
    >
      <Form form={searchForm} layout="vertical" onFinish={onSearch}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Name" name="search">
              <Input placeholder="Search by name (optional)" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Month" name="month">
              <DatePicker onChange={onChange} picker="month" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=" " colon={false}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button onClick={onReset}>Reset</Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        rowKey="email"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={users}
      />

      <UserModal {...userModalProps} />
    </Card>
  );
}
