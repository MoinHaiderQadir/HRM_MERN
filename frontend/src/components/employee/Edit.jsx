import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Fixed import

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // ✅ Fixed useParams usage

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    const employee = response.data.employee;
                    setEmployee((prev)=>({
                        ...prev,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
                alert("Failed to load employee details.");
            }
        };

        fetchEmployee();
    }, [id]); // ✅ Ensure effect runs when 'id' changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKENDURL}/api/employee/${id}`, // ✅ Fixed API URL (use PUT for update)
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees"); // ✅ Navigate after update
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments && employee ? (
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Edit Employee</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Marital Status</label>
                            <select
                                name="maritalStatus"
                                onChange={handleChange}
                                value={employee.maritalStatus}
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
                                value={employee.designation}
                                placeholder="Enter designation"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                onChange={handleChange}
                                value={employee.salary || ""}
                                placeholder="Enter salary"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>

                        {/* Department */}
                        <div className="col-span-2">
                            <label className="block text-gray-700 font-semibold">Department</label>
                            <select
                                name="department"
                                onChange={handleChange}
                                value={employee.department}
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>
                                        {dep.dep_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </>
    );
};

export default Edit;
