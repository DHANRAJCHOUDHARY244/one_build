
import { TransactionType } from '#/enum';
import TransactionData from './common';
interface Props {
  transaction_type: TransactionType; 
  onShowWithdrawal: (withdrawal: TransactionType) => void;
}

export default function DepositPage({ transaction_type, onShowWithdrawal }: Props) {

  return (
    <TransactionData
      transaction_type={transaction_type}
      onShowWithdrawal={onShowWithdrawal}
    />
  );
}
