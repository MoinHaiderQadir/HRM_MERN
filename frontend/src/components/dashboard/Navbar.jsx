import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout} = useAuth();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md w-full">
      {/* Mobile Menu Button */}
      <button className="lg:hidden" onClick={toggleSidebar}>
        <span className="text-xl">&#9776;</span>
      </button>

      {/* Logo / Brand */}
      <h1 className="text-xl font-bold">Employee MS</h1>

      {/* User Info & Logout Button */}
      <div className="flex items-center space-x-4">
        <p className="hidden sm:block">Welcome, {user?.name || "Guest"}!</p>

        {/* Animated Logout Button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
