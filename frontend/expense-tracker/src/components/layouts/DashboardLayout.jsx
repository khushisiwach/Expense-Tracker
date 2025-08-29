import React, { useContext } from 'react';
import { UserContext } from "../../context/UserContext";
import Navbar from './Navbar';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <main className="flex-grow p-10 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 min-h-screen">
  {children}
</main>

      )}
    </div>
  );
};

export default DashboardLayout;
