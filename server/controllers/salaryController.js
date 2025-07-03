import Salary from "../models/Salary.js"; // Add `.js` to the import
import Employee from '../models/Employee.js';

const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances = 0, deductions = 0, payDate } = req.body;

        const totalSalary = parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate, // Corrected `paydate` to `payDate`
        });

        await newSalary.save();

        return res.status(200).json({ success: true, message: "Salary added successfully." });
    } catch (error) {
        console.error("Error adding salary:", error);
        return res.status(500).json({ success: false, error: "Server error while adding salary." });
    }
};

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId')

        if(!salary || salary.length < 1 ){
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        }


        return res.status(200).json({success:true,salary})
    } catch (error) {
        console.error("Error fetching salary:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching salary." });
    }
};


export { addSalary, getSalary};
