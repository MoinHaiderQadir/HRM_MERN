import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // ✅ Fixed import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // ✅ Fixed 'useAuth' import
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user); // ✅ Store user data in context
        localStorage.setItem("token", response.data.token); // ✅ Store token

        // ✅ Redirect based on role
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      // ✅ Improved error handling
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-4">
      <div className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 font-poppins">
          WorkForce Hub
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center text-gray-700 font-poppins">
            Login
          </h2>

          {/* Email Input */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-gray-600 font-poppins">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-poppins"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-600 font-poppins">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-poppins"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end mt-2">
            <a href="#" className="text-sm text-blue-500 hover:underline font-poppins">
              Forgot Password?
            </a>
          </div>

          {/* Animated Login Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md font-semibold text-lg font-poppins transition duration-300 transform hover:scale-105 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
