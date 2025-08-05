import React from 'react';
import card_2 from "../../assets/images/card2.png";
import { LuTrendingDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60%] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>

      <div className='md:block w-[40vw] bg-blue-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-blue-600 absolute -top-7 -left-5' />
        <div className=' w-48 h-56 rounded-[40px] border-[20px] border-blue-600 absolute top-[30%] right-0' />
        <div className='w-48 h-48 rounded-[40px] bg-blue-500 absolute -bottom-7 -left-5' />

     
        <div className='w-130 absolute mt-20 -top-[50px] left-10 z-20'>
          <StatsInfoCard
            icon={<LuTrendingDown className="text-white" />}
            label="Track your Income & Expenses"
            value="43,000"
            color="bg-primary"
          />
        </div>

        <img 
          src={card_2} 
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-lg" 
          alt="Card illustration"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, color, label, value }) => {
  return (
    <div className='flex items-center bg-white p-4 rounded-lg shadow-md w-full text-left hover:bg-gray-100 cursor-pointer transition-all duration-300'>
      <div className={`w-8 h-8 flex items-center justify-center bg-blue-500 text-[18px] ${color} rounded-full mr-2`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-700'>{label}</h6>
        <span className='text-md font-bold text-gray-900'>${value}</span>
      </div>
    </div>
  );
};


