import React from 'react';

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className=" text-xs  text-purple-800 font-semibold mb-1">{payload[0].name}</p>
        <p className='text-sm text-gray-500'>
       Amount: <span className= " text-sm font-medium text-gray-500">₹{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
