import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const SummaryCard = () => {
    const { user } = useAuth();

    console.log("User data:", user); // Debugging

    return (
        <div className="rounded flex bg-white p-4 shadow-md">
            <div className="text-3xl flex justify-center items-center bg-blue-600 text-white w-12 h-12 rounded-full">
                <FaUser />
            </div>
            <div className="ml-3">
                <p className="text-lg font-semibold text-gray-700">Welcome Back</p>
                <p className="text-xl font-bold text-gray-900">{user?.name || "Guest"}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
