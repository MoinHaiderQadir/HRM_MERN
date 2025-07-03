import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave, FaCalendarCheck, FaClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import axios from 'axios'

const AdminSummary = () => {


  const [summary, setSummary] = useState(null)
  useEffect(() =>{
    const fetchSummary = async () =>{
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/dashboard/summary`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(res.data)
        setSummary(res.data)
        
      }catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary()
  }, [])

  if(!summary){
    return <div>Loading...</div>
  }



  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Dashboard Overview</h3>

      {/* Employee & Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-blue-500" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-500" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Total Salary" number={summary.totalSalary} color="bg-green-500" />
      </div>

      {/* Leave Management Section */}
      <h3 className="text-xl font-bold mt-6 mb-4">Leave Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard icon={<FaCalendarCheck />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-purple-500" />
<SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-green-500" />
<SummaryCard icon={<FaClock />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-yellow-500" />
<SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-red-500" />

      </div>
    </div>
  );
};

export default AdminSummary;
