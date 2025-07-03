import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log(response.data); // Debugging purpose

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response?.data?.success === false) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (e) => {
        const q = e.target.value.toLowerCase();
        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId.toLowerCase().includes(q)
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries === 0 ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Salary History</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by Employee ID"
                            className="border px-2 py-1 rounded-md"
                            onChange={filterSalaries}
                        />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary, index) => (
                                    <tr
                                        key={salary._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{salary.employeeId?.employeeId || "N/A"}</td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No records found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default View;
