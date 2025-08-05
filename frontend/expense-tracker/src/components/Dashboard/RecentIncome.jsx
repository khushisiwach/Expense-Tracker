import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import { TiThLarge } from 'react-icons/ti';

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Income</h3>

        <button onClick={onSeeMore} className="card-btn flex items-center gap-1">
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {transactions?.slice(0, 5).map((item, index) => (
          <TransactionInfoCard
            key={index}
            icon={<TiThLarge className="text-xl text-green-600" />}
            title={item?.source || 'Unknown'}
            amount={item?.amount || 0}
            date={item?.date || 'N/A'}
            type="income"
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
