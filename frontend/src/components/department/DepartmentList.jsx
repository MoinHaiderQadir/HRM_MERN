import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DepartmentButtons, columns } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]); // ✅ Always starts as an empty array

  const onDepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartments(data);
    setFilteredDepartments(data); // ✅ Also update filtered list when deleting
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/department`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id, // ✅ Fixed typo (_d → _id)
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data); // ✅ Ensure filtered data is set correctly
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const query = e.target.value.toLowerCase();
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(query)); // ✅ Fixed `includes`
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading ....</div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Heading */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
          </div>

          {/* Search & Button Container */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by Department Name..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={filterDepartments} // ✅ Use onChange (not onClick)
            />

            {/* Add Department Button */}
            <Link
              to="/admin-dashboard/add-department"
              className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
            >
              + Add New Department
            </Link>
          </div>

          {/* DataTable */}
          <div>
            <DataTable columns={columns} data={filteredDepartments || []} pagination/> {/* ✅ Prevent map error */}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
