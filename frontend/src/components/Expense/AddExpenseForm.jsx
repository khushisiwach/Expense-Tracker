import React, { useState } from "react";
// import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    icon: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const { category, amount, date } = expense;

    if (!category.trim()) {
      alert("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    if (!date) {
      alert("Date is required");
      return;
    }

    onAddExpense({
      ...expense,
      amount: parseFloat(amount),
      id: Date.now(),
    });

    // Reset form
    setExpense({
      icon: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
<div className="fixed inset-0 flex items-center justify-center z-50">
  {/* Backdrop blur */}
  <div className="absolute inset-0  backdrop-blur-sm"></div>

  {/* Modal content */}
  <div className="relative bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 
                  p-6 rounded-2xl shadow-xl w-full max-w-md z-10 space-y-4 gap-10" >
    <div className="flex items-center gap-2">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={(e) => handleChange("category", e.target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
      />
    </div>

    <Input
      value={expense.amount}
      onChange={(e) => handleChange("amount", e.target.value)}
      label="Amount"
      type="number"
    />

    <Input
      value={expense.date}
      onChange={(e) => handleChange("date", e.target.value)}
      label="Date"
      type="date"
    />

    <div className="flex justify-end mt-6">
      <button
        type="button"
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-300"
        onClick={handleSubmit}
      >
        Add Expense
      </button>
    </div>
  </div>
</div>



  );
};

export default AddExpenseForm;
