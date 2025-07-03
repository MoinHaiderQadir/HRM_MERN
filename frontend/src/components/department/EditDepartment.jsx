import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // ✅ Import axios

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([]); // ✅ Initialize as an object
    const [depLoading, setDepLoading] = useState(false);
    const navigate =useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/department/${id}`, 
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                if (response.data.success) {
                    setDepartment(response.data.department);
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
    }, [id]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit =async (e) =>{
        e.preventDefault();
    

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKENDURL}/api/department/${id}`, // ✅ Fixed API URL
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments"); // ✅ Fixed route
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // ✅ Fixed variable name
      }
    }
    }

    return (
        <>
            {depLoading ? <div>Loading ....</div> : 
                <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        {/* Heading */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                            Edit Department
                        </h2>

                        {/* Form */}
                        <form 
                        onSubmit={handleSubmit}
                        className="space-y-4">
                            {/* Department Name */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    name="dep_name"
                                    value={department.dep_name || ""} // ✅ Prevents errors if undefined
                                    onChange={handleChange}
                                    placeholder="Enter department name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={department.description || ""} // ✅ Prevents errors if undefined
                                    onChange={handleChange}
                                    placeholder="Enter department description"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                />
                            </div>

                            {/* Submit Button with Loading Animation */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md flex items-center justify-center transition duration-300"
                                disabled={depLoading} // ✅ Changed `loading` to `depLoading`
                            >
                                {depLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Editing...</span>
                                    </div>
                                ) : (
                                    "Edit Department"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default EditDepartment;
