import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DisplayEmployeeLeave = () => {
  const { id } = useParams();
  let sno = 1;

  const [Leaves, setleaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/leave/employee/${id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );

      console.log(response.data.leaves);

      if (response.data.success) {
        setleaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-0.5 border rounded"
        />
        <Link
          to="/employee-dashboard/addleaves"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add Leaves
        </Link>
      </div>

      {Leaves.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead>
            <tr className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {Leaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-4">No records found.</div>
      )}
    </div>
  );
};

export default DisplayEmployeeLeave;