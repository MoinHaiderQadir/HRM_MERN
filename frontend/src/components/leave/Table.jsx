import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/leave`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.leaves.map((leave) => {
            const employee = leave.employeeId || {};
            const userId = employee.userId || {};
            const department = employee.department || {};

            return {
              id: leave._id,
              sno: sno++,
              employeeId: employee.employeeId || "N/A",
              name: userId.name || "Unknown",
              leaveType: leave.leaveType || "N/A",
              department: department.dep_name || "Unknown",
              days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)),
              status: leave.status ? leave.status.toLowerCase() : "pending", 
              action: <LeaveButtons _id={leave._id} />,
            };
          });

          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  useEffect(() => {
    let updatedLeaves = leaves.filter((leave) =>
      leave.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus) {
      updatedLeaves = updatedLeaves.filter(
        (leave) => leave.status === filterStatus.toLowerCase()
      );
    }

    setFilteredLeaves(updatedLeaves);
  }, [searchTerm, filterStatus, leaves]);

  const handleFilterClick = (status) => {
    setFilterStatus(status.toLowerCase());
  };

  const handleDelete = async (leaveId) => {
    if (window.confirm("Are you sure you want to delete this leave?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKENDURL}/api/leave/delete/${leaveId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data.success) {
          setLeaves((prev) => prev.filter((leave) => leave.id !== leaveId));
          alert("Leave deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting leave:", error);
        alert("Failed to delete leave");
      }
    }
  };

  const LeaveButtons = ({ _id }) => (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate(`/admin-dashboard/leaves/${_id}`)}>
        View
      </button>
      <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(_id)}>
        Delete
      </button>
    </div>
  );

  const columns = [
    { name: "S No", selector: (row) => row.sno, width: "70px" },
    { name: "Emp-ID", selector: (row) => row.employeeId, width: "120px" },
    { name: "Name", selector: (row) => row.name, width: "150px" },
    { name: "Leave Type", selector: (row) => row.leaveType, width: "150px" },
    { name: "Department", selector: (row) => row.department, width: "170px" },
    { name: "Days", selector: (row) => row.days, width: "80px" },
    { name: "Status", selector: (row) => row.status, width: "120px" },
    { name: "Action", cell: (row) => row.action, width: "200px" },
  ];

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold text-center mb-4">Manage Employees</h3>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {["Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              className={`${filterStatus === status.toLowerCase() ? "bg-gray-700" : "bg-gray-500"} text-white px-4 py-2 rounded-md`}
              onClick={() => handleFilterClick(status)}
            >
              {status}
            </button>
          ))}
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setFilterStatus("")}>
            All
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredLeaves} pagination responsive />
    </div>
  );
};

export default Table;
