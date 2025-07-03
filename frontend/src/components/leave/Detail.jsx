import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const responnse = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (responnse.data.success) {
                    setLeave(responnse.data.leave);
                }
            } catch (error) {
                console.error("Error fetching employee:", error);
                alert("Failed to load employee details.");
            }
        };

        fetchLeave();
    }, [id]);

    const changeStatus = async (id, status) =>{
        try {
            const responnse = await axios.put(`${import.meta.env.VITE_BACKENDURL}/api/leave/${id}`, {status}, 
                {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (responnse.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            console.error("Error fetching employee:", error);
            alert("Failed to load employee details.");
        }
    }

    return (
        <>
            {leave ? (
                <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">View Details</h2>

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <img
                            src={`${import.meta.env.VITE_BACKENDURL}/${leave.employeeId.userId.profileImage}`}
                            alt="Employee"
                            className="w-32 h-32 rounded-full shadow-md"
                        />
                    </div>

                    {/* Employee Information */}
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Employee ID:</p>
                                <p className="text-gray-800">{leave.employeeId.employeeId}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Full Name:</p>
                                <p className="text-gray-800">{leave.employeeId.userId.name || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">LeaveType:</p>
                                <p className="text-gray-800">
                                    {(leave.leaveType)}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Reason:</p>
                                <p className="text-gray-800">{leave.reason}</p>
                            </div>

                            <div className="flex justify-between">
    <p className="font-semibold text-gray-600">Department:</p>
    <p className="text-gray-800">{leave.employeeId.department?.dep_name || "N/A"}</p>
</div>


                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">Start Date:</p>
                                <p className="font-medium">{new Date (leave.startDate).toLocaleDateString()}</p>
                            </div>

                            <div className="flex justify-between">
                                <p className="font-semibold text-gray-600">End Date:</p>
                                <p className="font-medium">{new Date (leave.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-between">
    <p className="font-semibold text-gray-600">
        {leave.status.toLowerCase() === "pending" ? "Action:" : "Status:"}
    </p>

    {leave.status.toLowerCase() === "pending" ? (
        <div className="flex space-x-2">
            <button 
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                onClick={() => changeStatus(leave._id, "Approved")}
            >
                Approve
            </button>
            
            <button 
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => changeStatus(leave._id, "Rejected")}
            >
                Reject
            </button>
        </div>
    ) : (
        <p className="font-medium">{leave.status}</p>
    )}
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

export default Detail;
