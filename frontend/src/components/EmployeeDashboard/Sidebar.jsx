import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaMoneyBill, FaCalendarAlt, FaCog, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/authContext";


const Sidebar = ({ isOpen, toggleSidebar }) => {
    const {user} = useAuth()
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
        className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 flex flex-col transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:flex`}
      >
        {/* Sidebar Title */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold">Employee MS</h3>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/employee-dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-all text-sm font-medium tracking-wide
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/profile/${user._id}`}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-all text-sm font-medium tracking-wide
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
            }
          >
            <FaUsers />
            <span>My Profile</span>
          </NavLink>

          <NavLink
            to={`/employee-dashboard/salary/${user._id}`}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-all text-sm font-medium tracking-wide
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
            }
          >
            <FaMoneyBill />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to="/employee-dashboard/leaves"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-all text-sm font-medium tracking-wide
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
            }
          >
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>

          <NavLink
            to="/employee-dashboard/setting"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-md transition-all text-sm font-medium tracking-wide
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Transparent Overlay for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
