import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

useEffect(() => {
  const result = prepareIncomeBarChartData(transactions);
  setChartData(result);
}, [transactions]);


  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg font-semibold">Income Overview</h5> 
      </div>
      <p className="text-xs text-gray-400 mt-0.5">
        Track your earnings over time and analyze your income transactions
      </p>
      <button className="add-btn" onClick={onAddIncome}>
        <LuPlus className="text-lg" />
        Add Income
      </button>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default IncomeOverview;
