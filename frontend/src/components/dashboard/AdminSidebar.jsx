import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaMoneyBill,
  FaCalendarAlt,
  FaCog,
  FaBars,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  // This will auto-close the sidebar on small screens when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:relative top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 flex flex-col transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Sidebar Title */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold">Employee MS</h3>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin-dashboard"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/departments"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaBuilding />
            <span>Departments</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/employees"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/salary/add"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaMoneyBill />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/leaves"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Transparent Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
