import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";



const List = () => {
  const {user} = useAuth()
  const [leaves, setLeaves] = useState([])
  let sno= 1;

  const fetchLeaves = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/leave/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


        if (response.data.success) {
            setLeaves(response.data.leaves);
           
        }
    } catch (error) {
        if (error.response?.data?.success === false) {
            alert(error.message);
        }
    }
};

useEffect(() => {
    fetchLeaves();
}, []);



  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h3 className="text-xl font-bold text-gray-800">Manage Leave</h3>
      </div>

      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-md p-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by department name"
          className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Add Leave Button */}
        <Link
          to="/employee-dashboard/add-leave"
          className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:bg-blue-700"
        >
          Add New Leave
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Leave Type</th>
                                    <th className="px-6 py-3">From</th>
                                    <th className="px-6 py-3">To</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave, index) => (
                                    <tr
                                        key={leave._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{leave.leaveType}</td>
                                        
                                        <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{leave.reason}</td>
                                        <td className="px-6 py-3">{leave.status}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
    </div>
  );
};

export default List;
