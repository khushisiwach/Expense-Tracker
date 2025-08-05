import React, { useState } from 'react';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

// Dummy Input component (replace with your styled Input if needed)
const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };
  <EmojiPickerPopup
  icon={income.icon}
  onSelect={(selectedIcon) => handleChange("icon" , selectedIcon)}
  />

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
