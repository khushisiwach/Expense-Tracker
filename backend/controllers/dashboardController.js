const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const incomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.totalAmount || 0;

    // Total Expense
    const expenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalExpense = expenseAgg[0]?.totalAmount || 0;

    // Last 60 days income transactions
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 days expenses
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last transactions (5 income + 5 expense)
    const recentIncomeTxns = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpenseTxns = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...recentIncomeTxns.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...recentExpenseTxns.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Final Response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transaction: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
