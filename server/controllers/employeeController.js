import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import multer from "multer";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "Employee with this email already exists." });
        }

        // **Fix: Hash the password correctly**
        const hashedPassword = await bcrypt.hash(password, 10);

        // **Fix: Use `hashedPassword` instead of `hashPassword`**
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Corrected variable name
            role,
            profileImage: req.file ? req.file.filename : "",
        });

        const savedUser = await newUser.save();

        // Check if the employee ID is already in use
        const existingEmployeeId = await Employee.findOne({ employeeId });
        if (existingEmployeeId) {
            return res.status(400).json({ success: false, error: "Employee ID is already in use." });
        }

        // Create a new Employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();
        return res.status(201).json({ success: true, message: "Employee added successfully." });

    } catch (error) {
        console.error("Error adding employee:", error);
        return res.status(500).json({ success: false, error: "Server error while adding employee." });
    }
}

const getEmployees = async (req, res) => { // ✅ Added req, res
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Employees server error" });
    }
}


const getEmployee = async (req, res) => { 
    const {id}= req.params;
    try {
        let employee;
        employee = await Employee.findById({_id: id})
        .populate('userId', {password: 0})
        .populate("department");
        if(!employee){
            employee = await Employee.findOne({userId: id})
            .populate('userId', {password: 0})
            .populate("department");
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Employees server error" });
    }
}

const updateEmployee = async (req,res) => {
    try{
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id});
        if(!employee){
            return res
            .status(404)
            .json({success: false, error: "Update employee server error"})
        }

        const user = await User.findById({_id: employee.userId})

        if(!user){
            return res.status(404)
            .json({success: false, error: "User not found"})

        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id},{
            maritalStatus, designation, salary, department
        }) 

        if(!updateEmployee || !updateUser){
            return res
            .status(404)
            .json({success: false, error: "Document not found"})
            
        }

        return res.status(200).json({success: true, message:"employee update"})

    }catch(error){
        return res.status(500).json({ success: false, error: "Update Employees server error" });

    }
};


const fetchEmployeesByDepId = async (req, res) =>{
    const {id}= req.params;
    try {
        const employees = await Employee.find({ department: id });
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Employees by depId server error" });
    }


}

export { addEmployee, upload, getEmployees, getEmployee,updateEmployee, fetchEmployeesByDepId};
