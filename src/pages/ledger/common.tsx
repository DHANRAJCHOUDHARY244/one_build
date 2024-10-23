import {
  Button,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Select,
  Popconfirm,
  DatePickerProps,
  DatePicker,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { GetAllLedgers } from '@/api/services/ledgerService';
import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Ledger, LedgerParams, LedgerResponse } from '#/entity';
import { TransactionType, UserStatus } from '#/enum';

export const renderStatusTag = (status: UserStatus) => {
  switch (status) {
    case UserStatus.APPROVED:
      return <ProTag color="success">APPROVED</ProTag>;
    case UserStatus.PENDING:
      return <ProTag color="yellow">PENDING</ProTag>;
    case UserStatus.REJECT:
      return <ProTag color="error">REJECTED</ProTag>;
    default:
      return null;
  }
};

function TransactionData({
  transaction_type: transcation_type,
  onShowWithdrawal,
}: {
  transaction_type: TransactionType;
  onShowWithdrawal: (withdrawal: TransactionType) => void;
}) {
  const [initialUsers, setInitialUsers] = useState<Ledger[]>([]);
  const [pendingRequest, setPendingRequest] = useState<number>(0);
  const [showTransactionColumns, setShowTransactionColumns] = useState(false);
  const [searchForm] = Form.useForm();
  const [selectedMonth, setSelectedMonth] = useState<any | null>(null);
  // Function to fetch transactions based on search parameters
  const fetchTransaction = async (params: LedgerParams = {}): Promise<LedgerResponse | void> => {
    try {
      const response = await GetAllLedgers(params);
      if (response) {
        setInitialUsers(response.users); // Set all users fetched from the API
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch initial transactions when the component mounts
  useEffect(() => {
    fetchTransaction({ type: transcation_type });
  }, [transcation_type]);

  // Fetch pending requests count
  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const response = await GetAllLedgers({
          type: transcation_type,
          status: UserStatus.PENDING,
        });
        if (response) {
          console.log(response);
          setPendingRequest(response.paging.total); // Assuming response contains total count
        }
      } catch (error) {
        console.error('Error fetching pending transactions:', error);
      }
    };
    fetchPendingTransactions(); // Call the async function inside useEffect
  }, [transcation_type]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString, 'Date', date);
    if (!dateString) {
      setSelectedMonth(undefined);
      return;
    }

    setSelectedMonth(dateString);
  };
  // Handle search form submission
  const onSearch = async (values: { search?: string; status?: UserStatus }) => {
    const { search, status } = values;
    // Fetch transactions based on search params
    await fetchTransaction({
      type: transcation_type,
      search,
      status,
      month: selectedMonth,
    });
  };

  const onReset = () => {
    searchForm.resetFields();
    setSelectedMonth(null);
  };

  const handleTransactionClick = () => {
    setShowTransactionColumns((prev) => !prev);
  };

  // Define table columns
  const columns: ColumnsType<Ledger> = [
    {
      title: 'User Name',
      dataIndex: ['user', 'user_name'],
    },
    {
      title: 'User Id',
      dataIndex: ['user', 'id'],
    },
    {
      title: `${transcation_type === TransactionType.WITHDRAWAL ? 'Withdrawal' : 'Deposit'} Date`,
      dataIndex: 'created_at',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
  ];

  // Conditional columns for Status and Action
  if (showTransactionColumns) {
    columns.push(
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        width: 120,
        render: (status) => <>{renderStatusTag(status)}</>,
      },
      {
        title: 'Action',
        key: 'operation',
        align: 'center',
        width: 100,
        render: (_) => (
          <div className="flex w-full justify-center text-gray">
            <IconButton onClick={() => console.log('Edit')}>
              <Iconify icon="solar:pen-bold-duotone" size={18} />
            </IconButton>
            <Popconfirm
              title="Delete the User"
              okText="Yes"
              cancelText="No"
              placement="left"
              onConfirm={() => console.log('Delete')}
            >
              <IconButton>
                <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
              </IconButton>
            </Popconfirm>
          </div>
        ),
      },
    );
  }

  return (
    <div>
      <div className="mb-3 flex w-full flex-wrap justify-between rounded-sm border-b-[1px] border-b-gray-300 px-1 py-3 shadow-sm">
        <div>
          <Typography.Title level={5}>
            Transactions Requests Pending: {pendingRequest}
          </Typography.Title>
          <Typography.Text type="secondary">
            Tap on the button to see all the transactions requests.
          </Typography.Text>
        </div>
        <Button type="primary" onClick={handleTransactionClick} style={{ borderRadius: '40px' }}>
          Transaction Requests
        </Button>
      </div>

      <div className="m-4 flex gap-1">
        <Button
          type="primary"
          style={{ borderRadius: '40px', backgroundColor: '#e17e7e' }}
          onClick={() => onShowWithdrawal(TransactionType.DEPOSIT)}
        >
          Deposit Data
        </Button>
        <Button
          type="primary"
          style={{ borderRadius: '40px' }}
          onClick={() => onShowWithdrawal(TransactionType.WITHDRAWAL)}
        >
          Withdrawal Data
        </Button>
      </div>

      <Form form={searchForm} layout="vertical" onFinish={onSearch}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item label="Search" name="search">
              <Input placeholder="Search by name" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Month" name="month">
              <DatePicker onChange={onChange} picker="month" />
            </Form.Item>
          </Col>

          {showTransactionColumns && (
            <Col span={4}>
              <Form.Item label="Status" name="status">
                <Select placeholder="Select status">
                  <Select.Option value={UserStatus.PENDING}>
                    {renderStatusTag(UserStatus.PENDING)}
                  </Select.Option>
                  <Select.Option value={UserStatus.APPROVED}>
                    {renderStatusTag(UserStatus.APPROVED)}
                  </Select.Option>
                  <Select.Option value={UserStatus.REJECT}>
                    {renderStatusTag(UserStatus.REJECT)}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col span={showTransactionColumns ? 5 : 16}>
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
        rowKey="id"
        columns={columns}
        dataSource={initialUsers} // This will now be populated by API response based on search
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
}

export default TransactionData;
