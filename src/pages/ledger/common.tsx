import {
  Button,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePickerProps,
  DatePicker,
  Pagination,
  Card,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { GetAllLedgers } from '@/api/services/ledgerService';
import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { Ledger, LedgerParams} from '#/entity';
import { TransactionType, UserStatus } from '#/enum';
import { ActionModal} from './actionModal';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [reqChangeModalProps, setReqChangeModalProps] = useState({
    user: { id: 0, amount: 0, user_name: '', created_at: '' },
    show: false, // Initially set to false
    onCancel: () => setReqChangeModalProps((prev) => ({ ...prev, show: false })),
    transcation_type: transcation_type,
  });
  

  // Function to fetch transactions based on search parameters
  const fetchTransaction = async (params: LedgerParams = {}): Promise<void> => {
    try {
      const response = await GetAllLedgers(params);
      if (response) {
        setInitialUsers(response.users); // Set all users fetched from the API
        setTotalRecords(response.paging.total); // Update total records for pagination
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch initial transactions when the component mounts
  useEffect(() => {
    fetchTransaction({
      type: transcation_type,
      page: currentPage,
      page_size: pageSize,
    });
  }, [transcation_type, currentPage, pageSize]);

  // Fetch pending requests count
  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const response = await GetAllLedgers({
          type: transcation_type,
          status: UserStatus.PENDING,
        });
        if (response) {
          setPendingRequest(response.paging.total);
        }
      } catch (error) {
        console.error('Error fetching pending transactions:', error);
      }
    };
    fetchPendingTransactions();
  }, [transcation_type]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date);
    setSelectedMonth(dateString || null);
  };

  // Handle search form submission with pagination included
  const onSearch = async (values: { search?: string; status?: UserStatus }) => {
    const { search, status } = values;
    await fetchTransaction({
      type: transcation_type,
      search,
      status,
      month: selectedMonth,
      page: currentPage,
      page_size: pageSize,
    });
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10); // Default to 10 if pageSize is undefined
    fetchTransaction({
      type: transcation_type,
      page,
      page_size: pageSize,
      search: searchForm.getFieldValue('search'), // Include current search/filter values
      status: searchForm.getFieldValue('status'),
      month: selectedMonth,
    });
  };

  const onReset = () => {
    searchForm.resetFields();
    setSelectedMonth(null);
    fetchTransaction({
      type: transcation_type,
      page: 1,
      page_size: pageSize,
    });
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
        render: (record) => (
          <div className="flex w-full justify-center text-gray">
           <IconButton
  onClick={() => {
    setReqChangeModalProps((prev) => ({
      ...prev,
      user: {
        id: record.user.id,
        amount: record.amount,
        user_name: record.user.user_name,
        created_at: record.created_at,
      },
      show: true, // Ensure modal is set to visible
    }));
  }}
>
  <Iconify icon="solar:pen-bold-duotone" size={18} />
</IconButton>

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
        dataSource={initialUsers}
        pagination={false} // Disable table's built-in pagination
      />

      <Card>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalRecords}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </Card>
      <ActionModal {...reqChangeModalProps}  fetchTransaction={fetchTransaction}   />
    </div>
  );
}

export default TransactionData;
