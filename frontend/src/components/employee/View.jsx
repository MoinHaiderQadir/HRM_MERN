import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
                alert("Failed to load employee details.");
            }
        };

        fetchEmployee();
    }, [id]);

    return (
        <>
            {employee ? (
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Employee Details</h2>

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <img
                            src={`${import.meta.env.VITE_BACKENDURL}/${employee.userId?.profileImage}`}
                            alt="Employee"
                            className="w-32 h-32 rounded-full shadow-md"
                        />
                    </div>

                    {/* Employee Information */}
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Employee ID:</p>
                                <p className="text-gray-800">{employee.employeeId}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Full Name:</p>
                                <p className="text-gray-800">{employee.userId?.name || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Date of Birth:</p>
                                <p className="text-gray-800">{new Date(employee.dob).toLocaleDateString()}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Gender:</p>
                                <p className="text-gray-800">{employee.gender}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Department:</p>
                                <p className="text-gray-800">{employee.department?.dep_name || "N/A"}</p> {/* ✅ Fix applied */}
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Status:</p>
                                <p className="font-medium">{employee.maritalStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading ...</div> // ✅ Fixed JSX syntax
            )}
        </>
    );
};

export default View;
