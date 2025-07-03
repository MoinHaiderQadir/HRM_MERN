import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition transform hover:scale-105 duration-300 ease-in-out">
      {/* Icon with Circle Background */}
      <div className={`text-3xl p-4 rounded-full ${color} text-white mb-2`}>
        {icon}
      </div>

      {/* Text */}
      <p className="font-semibold text-gray-700">{text}</p>

      {/* Number */}
      <p className="text-xl font-bold text-gray-900">{number}</p>
    </div>
  );
};

// ✅ Exporting correctly
export default SummaryCard;
