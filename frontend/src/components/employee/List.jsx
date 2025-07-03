import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from 'react-data-table-component';
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          console.log("🔹 Employees received from API:", response.data.employees);

          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "No Department",
            name: emp.userId?.name || "No Name",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "No DOB",
            profileImage: <img width={40} className="rounded-full" src={`${import.meta.env.VITE_BACKENDURL}/${emp.userId?.profileImage}`} alt="Profile" />,
            action: <EmployeeButtons Id={emp._id} />,
          }));

          console.log("🔹 Processed Employees Data:", data);
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // ✅ Fixed handleFilter function
  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = employees.filter((emp) => 
      emp.name.toLowerCase().includes(searchValue) // ✅ Fixed `.include()` to `.includes()`
    );
    setFilteredEmployee(records);
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Manage Employee</h3>
      </div>

      {/* Search & Button Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Employee Name..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={handleFilter} // ✅ Now correctly calls `handleFilter`
        />

        {/* Add Employee Button */}
        <Link
          to="/admin-dashboard/add-employee"
          className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
        >
          + Add New Employee
        </Link>
      </div>
      
      <div>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  );
};

export default List;
