import { Card } from 'antd';
import { useState, useCallback } from 'react';


import WithdrawalPage from './withdrawal';
import DepositPage from './deposit';
import { TransactionType } from '#/enum';

export default function LedgerPage() {
  const [isWithdrawal, setIsWithdrawal] = useState<TransactionType>(TransactionType.WITHDRAWAL);

  // Memoize the onShowWithdrawal function to avoid re-creation on every render
  const onShowWithdrawal = useCallback((withdrawal:TransactionType) => {
    setIsWithdrawal(withdrawal);
  }, []);


  return (
    <Card
    >
      {(isWithdrawal===TransactionType.WITHDRAWAL) ? (
        <WithdrawalPage transaction_type ={isWithdrawal} onShowWithdrawal={onShowWithdrawal} />
      ) : (
        <DepositPage transaction_type={isWithdrawal} onShowWithdrawal={onShowWithdrawal} />
      )}
    </Card>
  );
}
