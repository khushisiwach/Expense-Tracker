const xlsx = require("xlsx");
const Income = require("../models/Income");


exports.addIncome = async(req, res) => {
  const userId = req.user.id;
  try{
    const {icon , amount , source , date} = req.body;
    if(!amount || !source || !date){
        return res.send(400).json({message:"All fields are required"});
    }
    const newIncome = new Income({
        userId,
        icon,
        amount,
        source,
        date: new Date(date),
    })
    await newIncome.save();
    res.status(200).json(newIncome);
  }
  catch(error){
    res.status(500).json({message: "Server  error"});
  }
  
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
      const income = await Income.find({ userId }).sort({ date: -1 });
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

exports.deleteIncome = async(req, res) => {
  
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
      const income = await Income.find({ userId }).sort({ date: -1 });
      // Prepare the data for Excel
      const data = income.map((item) => ({
        Amount: item.amount,
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

