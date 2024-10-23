import { Iconify } from '../icon';

const withdrawalContent = {
  FirstHeading: 'Total Withdrawals',
  SecondHeading: 'Today`s Withdrawals',
};
interface DCardProps {
  _isWithdrawal?: boolean;
  FirstAmount?: string;
  SecondAmount?: string;
  Date: string;
}
export default function DCard({
  _isWithdrawal = false,
  FirstAmount = '0',
  SecondAmount = '0',
  Date,
}: DCardProps) {
  return (
    <div
      className={`rounded-[20px] p-6 shadow-lg ${
        _isWithdrawal ? 'bg-[#ddd4d3]' : 'bg-[#da251c] text-[#ffffff]'
      }`}
    >
      <div className="flex items-start justify-between ">
        <div>
          <p className="text-sm">
            {_isWithdrawal ? withdrawalContent.FirstHeading : 'Total Money Received'}
          </p>
          <p className="mt-2 text-2xl font-semibold">₹{FirstAmount}</p>
        </div>
        <div className="bg-white rounded-full bg-opacity-10 ">
          <Iconify
            icon={_isWithdrawal ? 'uil:money-withdrawal' : 'mdi:instant-deposit'}
            size={40}
            className={_isWithdrawal ? 'text-[#000]' : 'text-[#ffffff]'}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-between ">
        <div>
          <p className="text-sm">
            {_isWithdrawal ? withdrawalContent.FirstHeading : "Today's Collection"}
          </p>
          <p className="text-xl font-semibold">₹{SecondAmount}</p>
        </div>
        <div>
          <p className="text-sm">Date</p>
          <p className="text-xl font-semibold">{Date}</p>
        </div>
      </div>
      <button className="mt-6 flex w-full items-center justify-around rounded-lg bg-[rgba(255,255,255,0.1)] py-2 bg-blend-overlay hover:bg-[rgba(218,37,28,0.5)]">
        <p className="text-lg">Tap to view the details</p>
        {/* <img src={EyeIcon} alt="icon" /> */}
        <Iconify
          icon="f7:eye-fill"
          size={35}
          className={`rounded-full p-2 ${
            _isWithdrawal ? 'bg-[#718EBF] text-[#fff]' : 'bg-[#fff] text-[rgb(218,37,28)]'
          }`}
        />
      </button>
    </div>
  );
}
