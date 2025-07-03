import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev)=>!prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />
        

        {/* Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold">Welcome, {user?.name || "Moin "}!</h1>
          <p className="text-gray-700">Manage your system efficiently.</p>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
