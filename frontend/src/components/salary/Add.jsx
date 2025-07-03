import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Fixed import

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        paydate: null,
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    




    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    



    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value); // ✅ Fixed typo
        setEmployees(emps);
    };
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/api/salary/add/`, // ✅ Fixed API URL (use PUT for update)
                salary,
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
            {departments ? (
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Add Salary</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                       
                       {/* Department */}
                       <div>
                            <label className="block text-gray-700 font-semibold">Department</label>
                            <select
                                name="department"
                                onChange={handleDepartment}
                                
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


                         {/* Employee */}

                         <div >
                            <label className="block text-gray-700 font-semibold">Employee</label>
                            <select
                                name="employeeId"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.employeeId}
                                    </option>
                                ))}
                            </select>
                        </div>

                      

                        {/* Basic Salary */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Basic Salary</label>
                            <input
                                type="number"
                                name="basicSalary"
                                onChange={handleChange}
                                placeholder=" Basic Salary"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>

                        {/* Allowances */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Allowances</label>
                            <input
                                type="number"
                                name="allowances"
                                onChange={handleChange}
                                placeholder="Enter Allowances"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>


                        {/* Deductions */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Deductions</label>
                            <input
                                type="number"
                                name="deductions"
                                onChange={handleChange}
                                placeholder="Enter Deductions"
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>


                          {/* Pay Date */}
                          <div>
                            <label className="block text-gray-700 font-semibold">Pay Date</label>
                            <input
                                type="date"
                                name="payDate"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400"
                            />
                        </div>

                        

                       

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Add Salary
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </>
    );
};

export default Add;
