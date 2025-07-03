import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import NavBar from "../components/dashboard/Navbar";
import { useAuth } from "../context/authContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* Navbar */}
        <NavBar toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold">Welcome, {user?.name || "Moin"}!</h1>
          <p className="text-gray-700">Manage your system efficiently.</p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
