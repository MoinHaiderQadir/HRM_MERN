import User from "../models/User.js";
import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Incorrect old password" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashPassword }, { new: true });

        return res.status(200).json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

export { changePassword };
