/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unused-imports/no-unused-vars-ts */

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
}: {
  user: UserData;
  show: boolean;
  onCancel: VoidFunction;
}) {
  const [loadingButtonIndex, setLoadingButtonIndex] = useState<number | null>(null);

  const handleAction = async (index: number) => {
    setLoadingButtonIndex(index);

    try {
      console.log(index === 0 ? 'Approved' : 'Rejected');
      onCancel();
    } catch (error) {
      console.error('Error during action:', error);
    } finally {
      setLoadingButtonIndex(null); // Reset loading state after completion
    }
  };

  return (
    <Modal
      open={show}
      footer={null} // Remove the default footer to eliminate the Ok and Cancel buttons
      onOk={onCancel}
    >
      <div className="flex flex-col justify-center text-center align-middle">
        <Typography.Title level={5} className="mb-4 text-gray-600">
          New Withdrawal Request : {user.created_at}
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
            loading={loadingButtonIndex === 0} // Show loading only if this button is clicked
            onClick={() => handleAction(0)} // Handle "Approve" action
            disabled={loadingButtonIndex !== null} // Disable if any button is clicked
          >
            APPROVE
          </Button>
          <Button
            type="primary"
            icon={<CloseOutlined />}
            loading={loadingButtonIndex === 1} // Show loading only if this button is clicked
            onClick={() => handleAction(1)} // Handle "Reject" action
            disabled={loadingButtonIndex !== null} // Disable if any button is clicked
          >
            REJECT
          </Button>
        </div>
      </div>
    </Modal>
  );
}
