import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-2 text-sm">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-gray-700 font-medium">{entry.value}</span>
          <span className="text-gray-500 text-xs">₹{entry.payload.amount}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
