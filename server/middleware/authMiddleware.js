import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader); // ✅ Debugging log

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token Not Provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // ✅ Debugging log

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("Decoded Token:", decoded); // ✅ Debugging log

    if (!decoded || !decoded._id) {
      return res.status(401).json({ success: false, error: "Invalid Token" });
    }

    // Find user in database
    const user = await User.findById(decoded._id).select("-password");
    console.log("Found User:", user); // ✅ Debugging log

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware Error:", error.message); // ✅ Log the error
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, error: "Invalid Token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token Expired" });
    } else {
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

export default verifyUser;
