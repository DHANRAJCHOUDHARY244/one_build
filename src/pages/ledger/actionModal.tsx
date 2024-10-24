import { DepositDetailsResponse, WithdrawDetailsResponse } from '#/entity';
import { TransactionType, UserStatus } from '#/enum';
import {
  UpdateLedgerDepositRequest,
  UpdateLedgerWithdrawRequest,
} from '@/api/services/ledgerService';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';

export type UserData = {
  id: number;
  amount: number;
  user_name: string;
  created_at: string;
};

export function ActionModal({
  user,
  show,
  onCancel,
  transcation_type,
}: {
  user: UserData;
  show: boolean;
  onCancel: VoidFunction;
  transcation_type: TransactionType;
}) {
  const [reqType, setReqType] = useState<UserStatus | null>(null);
  const [responseDataWihdraw, setResonseDataWihdraw] = useState<WithdrawDetailsResponse | null>(
    null,
  );
  const [responseDataDeposit, setResonseDataDeposit] = useState<DepositDetailsResponse | null>(
    null,
  );

  const handleAction = async (type:UserStatus) => {
    try {
      setReqType(type); // Set the type of request in progress
      if (transcation_type === TransactionType.WITHDRAWAL) {
        const response = await UpdateLedgerWithdrawRequest({
          withdraw_request_id: user.id,
          status: type,
        });

        // Check if withdraw_details is valid and matches expected type
        if (response) {
          setResonseDataWihdraw(response); // Assign valid data
        } else {
          setResonseDataWihdraw(null); // Explicitly set to null if no data
        }
      } else if (transcation_type === TransactionType.DEPOSIT) {
        const response = await UpdateLedgerDepositRequest({
          transaction_id: user.id,
          status: type,
        });

        // Check if deposit_details is valid and matches expected type
        if (response) {
          setResonseDataDeposit(response); // Assign valid data
        } else {
          setResonseDataDeposit(null); // Explicitly set to null if no data
        }
      }
    } catch (error) {
      console.error('Error during action:', error);
    } finally {
      setReqType(null); // Reset reqType after the action
    }
  };

  return (
    <Modal open={show} footer={null} onCancel={onCancel}>
      {transcation_type === TransactionType.WITHDRAWAL && responseDataWihdraw && (
        <Typography.Title level={4}>Withdraw Request Details</Typography.Title>
      )}
      {transcation_type === TransactionType.DEPOSIT && responseDataDeposit && (
        <Typography.Title level={4}>Deposit Request Details</Typography.Title>
      )}
      {!responseDataDeposit && !responseDataDeposit && (
        <div className="flex flex-col justify-center text-center align-middle">
          <Typography.Title level={5} className="mb-4 text-gray-600">
            New {transcation_type} Request : {user.created_at}
          </Typography.Title>
          <div className="mb-2 text-gray-600">
            <p>User ID: {user.user_name}</p>
            <p>Amount: ${user.amount.toLocaleString()}</p>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              style={{ backgroundColor: 'green' }}
              loading={reqType === UserStatus.APPROVED} // Show loading only if this button is clicked
              onClick={() => handleAction(UserStatus.APPROVED)} // Handle "Approve" action
              disabled={reqType !== null} // Disable if any button is clicked
            >
              APPROVED
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              loading={reqType === UserStatus.REJECT} // Show loading only if this button is clicked
              onClick={() => handleAction(UserStatus.REJECT)} // Handle "Reject" action
              disabled={reqType !== null} // Disable if any button is clicked
            >
              REJECT
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
