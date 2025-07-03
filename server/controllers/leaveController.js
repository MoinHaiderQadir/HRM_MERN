import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js"; // Added missing import

const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found." });
        }

        const newLeave = new Leave({
            employeeId: employee._id, leaveType, startDate, endDate, reason
        });

        await newLeave.save();

        return res.status(200).json({ success: true, message: "Leave added successfully." });
    } catch (error) {
        console.error("Error adding leave:", error);
        return res.status(500).json({ success: false, error: "Server error while adding leave." });
    }
};

const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id });

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found." });
        }

        const leaves = await Leave.find({ employeeId: employee._id });
        return res.status(200).json({ success: true, leaves });

    } catch (error) {
        console.error("Error fetching leave:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching leave." });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name" }
            ]
        });

        return res.status(200).json({ success: true, leaves });

    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching leaves." });
    }
};
const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid leave ID" });
        }

        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "profileImage" }
            ]
        });

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        return res.status(200).json({ success: true, leave });

    } catch (error) {
        console.error("Error fetching leave detail:", error);
        return res.status(500).json({ success: false, message: "Server error while fetching leave detail." });
    }
};

const updateLeave = async (req, res) =>{
    try{

        const {id} = req.params;
        
        const leave = await Leave.findByIdAndUpdate({_id:id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({ success: false, message: "Leave not found." })
        }
        return res.status(200).json({success: true})

    }catch (error) {
        console.error("Error fetching leave detail:", error);
        return res.status(500).json({ success: false, message: "Server error while fetching leave detail." });
    }

}

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
