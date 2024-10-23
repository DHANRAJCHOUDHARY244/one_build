import { Icon } from '@iconify/react';

function Transactions(data: any[], isDeposit = false) {
  // Check if data is undefined or not an array
  if (!Array.isArray(data)) return []; // Return an empty array if data is undefined or not an array

  return data.map((transaction) => {
    const { user, created_at: date, amount, status } = transaction;
    const icon = 'ri:money-rupee-circle-line';
    const title = `${isDeposit ? 'Deposit' : 'Withdrawal'} from ${user.user_name}`;
    const formattedAmount = isDeposit ? `+${amount}` : `-${amount}`; // Assuming you want positive for deposits

    return {
      icon,
      title,
      date,
      amount: formattedAmount,
      currency: '₹',
      status,
      bgColor: isDeposit ? 'bg-yellow-100' : 'bg-green-100', // Background color for the icon container
      iconColor: isDeposit ? 'text-[#FFBB38]' : 'text-[#16DBCC]', // Icon color
    };
  });
}

function TransactionItem({
  icon,
  title,
  date,
  amount,
  currency,
  bgColor,
  iconColor,
}: {
  icon: string;
  title: string;
  date: string;
  amount: string;
  currency: string;
  bgColor: string;
  iconColor: string;
}) {
  const isNegative = amount.startsWith('-');
  const amountStyle = isNegative ? 'text-[#FF4B4A]' : 'text-[#41D4A8]';
  const amountValue = isNegative ? amount.substring(1) : amount;

  return (
    <div className="bg-white flex items-center justify-between rounded-lg border-b border-[#9b9a9a6e] p-1">
      <div className="flex items-center">
        {/* Icon container with custom background and icon color */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor}`}>
          <Icon icon={icon} className={`text-2xl ${iconColor}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray">{date}</p>
        </div>
      </div>
      <div className={`text-sm font-medium ${amountStyle}`}>
        {isNegative ? '-' : '+'}
        {currency}
        {amountValue}
      </div>
    </div>
  );
}

function TransactionsList({ deposit, withdrawal }: any) {
  const transactions = [...Transactions(deposit, true), ...Transactions(withdrawal)];

  // Check if there are no transactions
  if (transactions.length === 0) {
    return (
      <div className="bg-gray-50 mx-auto space-y-4 rounded-lg p-6 shadow-lg">
        <div className="flex justify-around align-middle">
          <p className="text-left text-sm font-bold text-black">Recent Transaction</p>
          <p className="text-right text-sm font-bold text-black"> See All</p>
        </div>
        <p className="text-center text-gray-500">No transactions available.</p>{' '}
        {/* Fallback message */}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 mx-auto space-y-4 rounded-lg p-6 shadow-lg">
      <div className="flex justify-around align-middle">
        <p className="text-left text-sm font-bold text-black">Recent Transaction</p>
        <p className="text-right text-sm font-bold text-black"> See All</p>
      </div>
      {transactions.map((tx, index) => (
        <TransactionItem key={index} {...tx} />
      ))}
    </div>
  );
}

export default TransactionsList;
