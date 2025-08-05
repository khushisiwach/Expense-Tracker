const xlsx = require("xlsx");
const Expense = require("../models/Expense");


exports.addExpense = async(req, res) => {
  const userId = req.user.id;
  try{
    const {icon , amount , category , date} = req.body;
    if(!amount || !category || !date){
        return res.send(400).json({message:"All fields are required"});
    }
    const newExpense = new Expense({
        userId,
        icon,
        amount,
        category,
        date: new Date(date),
    })
    await newExpense.save();
    res.status(200).json(newExpense);
  }
  catch(error){
    res.status(500).json({message: "Server  error"});
  }
  
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
      const expense = await Expense.find({ userId }).sort({ date: -1 });
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

exports.deleteExpense = async(req, res) => {
    
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
      const expense = await Expense.find({ userId }).sort({ date: -1 });
      // Prepare the data for Excel
      const data = expense.map((item) => ({
        Category: item.category,
        Source: item.source,
        Date: item.date,
      }));
  
      // Create a new workbook and worksheet
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      xlsx.utils.book_append_sheet(wb, ws, "Income");
  
      // Write the file to buffer
      xlsx.writeFile(wb,'income_details.xlsx');
  
      // Send the file as a response
      res.download('income_details.xlsx');

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error downloading Excel file" });
    }
  };

