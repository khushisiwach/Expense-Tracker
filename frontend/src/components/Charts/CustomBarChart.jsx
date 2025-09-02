import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {
    
const getBarColor = (index) => {
  return  index % 2 === 0 ? "#875cf5" : "#cfbefb";
};
const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded-lg shadow-md border-gray-300">
        <p className=" text-xs text-purple-800 font-semibold mb-1">{payload[0].payload.category}</p>
        <p className="text-sm text-gray-600" >
            Amount: <span className='text-sm font-medium text-gray-900'>
                ${payload[0].payload.amount}
            </span>
        </p>
      </div>
    );
  }
  return null;
};

  return (
    <div className='bg-white mt-6 p-4 rounded-lg shadow'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
