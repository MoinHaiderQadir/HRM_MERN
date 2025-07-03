import React from "react"; // ✅ Import React
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios"; // ✅ Import axios

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => { // ✅ No need to pass '_id' again, already in props
        const confirmDelete = window.confirm("Do you want to delete?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKENDURL}/api/department/${_id}`, 
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                if (response.data.success) {
                    onDepartmentDelete(_id); // ✅ Corrected '_id'
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            {/* Edit Button */}
            <button
                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)} // ✅ Corrected '_id'
            >
                Edit
            </button>

            {/* Delete Button */}
            <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleDelete} // ✅ No need to pass 'Id' or '_id' separately
            >
                Delete
            </button>
        </div>
    );
};
