import TransactionData from './common';

import { TransactionType } from '#/enum';

interface Props {
  transaction_type: any; // Replace `any` with a more specific type if possible (e.g., `string` or `boolean`)
  onShowWithdrawal: (withdrawal: TransactionType) => void;
}

export default function WithdrawalPage({ transaction_type, onShowWithdrawal }: Props) {
  return (
    <TransactionData
      transaction_type={transaction_type}
      onShowWithdrawal={onShowWithdrawal}
    />
  );
}
