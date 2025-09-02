import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Navigate, useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions ";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import {useUserAuth} from "../../hooks/useUserAuth"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
const Dashboard = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
  <DashboardLayout activeMenu="Dashboard">
  {/* Background blobs */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="bg-blob bg-blob1"></div>
    <div className="bg-blob bg-blob2"></div>
    <div className="bg-blob bg-blob3"></div>
     <div className="bg-blob bg-blob4"></div>
      <div className="bg-blob bg-blob5"></div>
  </div>

  <div className="my-10 mx-auto max-w-7xl px-4 relative z-10">
    {/* Cards grid same white style */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="theme-card">
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandSeperator(dashboardData?.totalBalance || 0)}
          color="text-violet-600"
        />
      </div>

      <div className="theme-card">
        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandSeperator(dashboardData?.totalIncome || 0)}
          color="text-green-500"
        />
      </div>

      <div className="theme-card">
        <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandSeperator(dashboardData?.totalExpense || 0)}
          color="text-red-500"
        />
      </div>
    </div>

    {/* Widgets */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 ">
      <div className="theme-card">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
        />
      </div>

      <div className="theme-card">
        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />
      </div>

      <div className="theme-card">
        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transaction || []}
          onSeeMore={() => navigate("/expense")}
        />
      </div>

      <div className="theme-card col-span-1 lg:col-span-2">
        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transaction || []}
        />
      </div>

      <div className="theme-card">
        <RecentIncomeWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
        />
      </div>

      <div className="theme-card">
        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />
      </div>
    </div>
  </div>
</DashboardLayout>

  );
};

export default Dashboard;
