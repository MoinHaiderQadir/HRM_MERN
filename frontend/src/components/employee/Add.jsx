import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()


    useEffect(() => {
        const getDepartments= async() =>{
        const departments =await  fetchDepartments()
        setDepartments(departments)
        };
        getDepartments()
    }, [])


    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "image") {
          setFormData((prevData) => ({ ...prevData, [name]: files[0] })); // ✅ Fixed variable name
      } else {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
  };
  



    const handleSubmit =async (e) => {
        e.preventDefault()
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) =>{
            formDataObj.append(key,formData[key])
            
        })



        try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKENDURL}/api/employee/add`, // ✅ Fixed API URL
              formDataObj,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
      
            if (response.data.success) {
              navigate("/admin-dashboard/employees"); // ✅ Fixed route
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error); // ✅ Fixed variable name
            }
          }


    }



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit}
      className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-gray-700 font-semibold">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Enter employee ID"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-semibold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-semibold">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-gray-700 font-semibold">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700 font-semibold">Designation</label>
          <input
            type="text"
            name="designation"
            onChange={handleChange}
            placeholder="Enter designation"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-700 font-semibold">Department</label>
          <select
            name="department"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Department</option>
           {departments.map((dep) => (
  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
))}

        
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-semibold">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Enter salary"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-700 font-semibold">Role</label>
          <select
            name="role"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-gray-700 font-semibold">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
