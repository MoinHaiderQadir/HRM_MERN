import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Import axios

const AddDepartment = () => {
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading before API call

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/department/add`, // ✅ Fixed API URL
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments"); // ✅ Fixed route
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // ✅ Fixed variable name
      }
    }

    setTimeout(() => {
      setLoading(false);
      alert("Department added successfully!");
    }, 2000);
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add New Department
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Department Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              value={department.dep_name} // ✅ Controlled Input
              onChange={handleChange}
              placeholder="Enter department name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={department.description} // ✅ Controlled Input
              onChange={handleChange}
              placeholder="Enter department description"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Submit Button with Loading Animation */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md flex items-center justify-center transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              "Add Department"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
