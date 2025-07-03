import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKENDURL}/api/setting/change-password`,
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Old Password</label>
                        <input 
                            type="password" 
                            name="oldPassword" 
                            placeholder="Enter old password" 
                            value={setting.oldPassword}
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">New Password</label>
                        <input 
                            type="password" 
                            name="newPassword" 
                            placeholder="Enter new password" 
                            value={setting.newPassword}
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm new password" 
                            value={setting.confirmPassword}
                            onChange={handleChange} 
                            required 
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Setting;
