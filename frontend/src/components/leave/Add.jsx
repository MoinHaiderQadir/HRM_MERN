import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Added missing import

const Add = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [leave, setLeave] = useState({
        userId: user._id,
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/api/leave/add`, 
                leave, // Send leave data in the request
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                navigate('/employee-dashboard/leaves');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Request for Leave
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}> {/* Added onSubmit */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Leave Type
                    </label>
                    <select
                        name="leaveType"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            From Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            To Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="reason"
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-medium text-lg hover:bg-blue-700 transition"
                >
                    Submit Leave Request
                </button>
            </form>
        </div>
    );
};

export default Add;
